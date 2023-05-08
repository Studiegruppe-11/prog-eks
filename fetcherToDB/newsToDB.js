// newsToDB.js i fetcherToDB mappen
// Importer nødvendige biblioteker
const cron = require("node-cron"); // Benyttes til at planlægge opgaver
const axios = require("axios"); // Benyttes til at foretage HTTP-anmodninger
const Connection = require("tedious").Connection; // Benyttes til at oprette forbindelse til SQL-databasen
const Request = require("tedious").Request; // Benyttes til at sende SQL-forespørgsler
const TYPES = require("tedious").TYPES; // Benyttes til at definere SQL-parametretyper
require("dotenv").config({ path: "../.env" }); // Indlæser konfigurationsvariabler fra .env-fil

const config = require("../database/config.js"); // Indlæser databasens konfigurationsfil
const apiKey = process.env.news1; // Indlæser API-nøglen fra .env-filen
const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${apiKey}`;

const connection = new Connection(config); // Opretter en ny forbindelse til SQL-databasen

// Funktion med promis til at oprette en forbindelse til Azure SQL Database
function connect() {
  return new Promise((resolve, reject) => {
    connection.on("connect", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Forbundet til Azure SQL Database");
        resolve();
      }
    });
    // Starter forbindelsen
    connection.connect();
  });
}

// Hovedfunktionen, der styrer forbindelsen og indsættelsen af nyhedsdata
async function run() {
  try {
    // Try til at oprette forbindelse og hente nyhedsdata
    await connect();
    await fetchNewsData();
    console.log("Alle nyhedsartikler blev indsat succesfuldt");
  } catch (error) {
    // Udskriver fejl, hvis der try ikke generere en forbindelse
    console.error("Fejl ved indsættelse af nyhedsartikler:", error);
  }
}

// Funktion til at hente nyhedsdata fra NewsAPI
async function fetchNewsData() {
  // Sender en HTTP GET-anmodning til NewsAPI med Axios
  const response = await axios.get(url);

  if (response.data.status === "ok") {
    // Hvis anmodningen er succesfuld fortsættes der
    console.log("Hentede nyhedsdata succesfuldt");

    // artikler gemmes i en variabel og der oprettes et promises for hver artikel
    const articles = response.data.articles;
    const promises = articles.map(insertNewsData);
    await Promise.all(promises);
  }
}

// nedenstående konstant er et array til at håndtere SQL-forespørgsler
const requestQueue = [];

// Funktion til at indsætte en enkelt nyhedsartikel i databasen
async function insertNewsData(article) {
  if (
    !article.urlToImage ||
    article.urlToImage.trim() === "" ||
    article.urlToImage.trim().toLowerCase() === "null"
  ) {
    // Spring over artikler uden billeder
    console.log("Springer artikel uden billede over:", article.title);
    return;
  }

  return new Promise((resolve, reject) => {
    // SQL-forespørgslen til at indsætte en artikel i databasen
    const insertQuery = `
      INSERT INTO News (title, author, description, url, publishedAt, content, imageUrl)
      VALUES (@title, @author, @description, @url, @publishedAt, @content, @imageUrl);
    `;

    console.log(insertQuery);

    // Opretter en ny SQL-forespørgsel og håndterer dens resultater
    const request = new Request(insertQuery, (err) => {
      if (err) {
        reject(err);
      } else {
        // Hvis promise lykkes, løses løftet
        console.log("Uploadede artikel:", article.title);
        resolve();
        executeNextRequest(); // Fortsætter med næste forespørgsel i køen
      }
    });

    // Parametre til SQL-forespørgslen
    request.addParameter("title", TYPES.NVarChar, article.title);
    request.addParameter("author", TYPES.NVarChar, article.author);
    request.addParameter("description", TYPES.NVarChar, article.description);
    request.addParameter("url", TYPES.NVarChar, article.url);
    request.addParameter(
      "publishedAt",
      TYPES.DateTime2,
      new Date(article.publishedAt)
    );
    request.addParameter("content", TYPES.NVarChar, article.content);
    request.addParameter("imageUrl", TYPES.NVarChar, article.urlToImage);

    // Tilføjer forespørgslen til køen
    requestQueue.push(request);

    if (requestQueue.length === 1) {
      // Hvis dette er den første forespørgsel, udføres den straks
      connection.execSql(requestQueue[0]);
    }
  });
}

// Funktion til at udføre den næste forespørgsel i køen
function executeNextRequest() {
  // Fjerner den fuldførte forespørgsel fra køen
  requestQueue.shift();

  // Hvis der er yderligere forespørgsler i køen, udføres den næste
  if (requestQueue.length > 0) {
    connection.execSql(requestQueue[0]);
  }
}

// cron bruger vi til at køre funktionen dagligt kl. 13:00
cron.schedule("0 13 * * *", () => {
  run();
});
