// /fetcherToDB/otherNewsToDB.js
// Importer nødvendige biblioteker
const cron = require("node-cron"); // Benyttes til at planlægge opgaver
const axios = require("axios"); // Benyttes til at foretage HTTP-anmodninger
const Connection = require("tedious").Connection; // Benyttes til at oprette forbindelse til SQL-databasen
const Request = require("tedious").Request; // Benyttes til at sende SQL-forespørgsler
const TYPES = require("tedious").TYPES; // Benyttes til at definere SQL-parametretyper
require("dotenv").config({ path: "../.env" }); // Indlæser konfigurationsvariabler fra .env-fil

const config = require("../database/config.js"); // Indlæser databasens konfigurationsfil
const apiKey = process.env.news2; // Indlæser API-nøglen fra miljøvariablerne

const connection = new Connection(config); // Opretter en ny forbindelse til SQL-databasen

// Funktion til at oprette en forbindelse til Azure SQL Database
function connect() {
  return new Promise((resolve, reject) => {
    connection.on("connect", (err) => {
      if (err) {
        // Hvis der opstår en fejl under forbindelsen, afvises løftet
        reject(err);
      } else {
        // Hvis forbindelsen oprettes succesfuldt, løses løftet
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
    // Forsøger at oprette forbindelse og hente nyhedsdata
    await connect();
    await fetchNewsData();
    console.log("Alle nyhedsartikler blev indsat succesfuldt");
  } catch (error) {
    // Hvis der opstår en fejl, udskrives den
    console.error("Fejl ved indsættelse af nyhedsartikler:", error);
  }
}

// Funktion til at hente nyhedsdata fra mediastack API
async function fetchNewsData() {
  // URL til mediastack API-endepunktet
  const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&language=en&limit=10`;

  // Sender en HTTP GET-anmodning til mediastack API
  const response = await axios.get(url);

  console.log("Hentede nyhedsdata succesfuldt");
  const articles = response.data.data; // Gemmer artiklerne fra responsen
  const promises = articles.map(insertNewsData); // Opretter et løfte for hver artikel
  await Promise.all(promises); // Afventer, at alle artikler er blevet indsat
}

const requestQueue = []; // Kø til at håndtere SQL-forespørgsler

// Funktion til at indsætte en enkelt nyhedsartikel i databasen
async function insertNewsData(article) {
  if (!article.image) {
    // Spring over artikler uden billeder
    console.log("Springer artikel uden billede over:", article.title);
    return;
  }

  return new Promise((resolve, reject) => {
    const imageUrl = article.image.split("?")[0]; // Fjerner eventuelle forespørgselsparametre fra billed-URL'en

    // SQL-forespørgslen til at indsætte en artikel i databasen
    const insertQuery = `
            INSERT INTO News (title, author, description, url, publishedAt, imageUrl)
      VALUES (@title, @author, @description, @url, @publishedAt, @imageUrl);
    `;

    // Opretter en ny SQL-forespørgsel og håndterer dens resultater
    const request = new Request(insertQuery, (err) => {
      if (err) {
        // Hvis der opstår en fejl under indsættelsen, afvises løftet
        reject(err);
      } else {
        // Hvis indsættelsen lykkes, løses løftet
        console.log("Uploadede artikel:", article.title);
        resolve();
        executeNextRequest(); // Fortsætter med næste forespørgsel i køen
      }
    });

    // Tilføjer parametre til SQL-forespørgslen
    request.addParameter("author", TYPES.NVarChar, article.author);
    request.addParameter("title", TYPES.NVarChar, article.title);
    request.addParameter("description", TYPES.NVarChar, article.description);
    request.addParameter("url", TYPES.NVarChar, article.url);
    request.addParameter("imageUrl", TYPES.NVarChar, imageUrl);
    request.addParameter(
      "publishedAt",
      TYPES.DateTime2,
      new Date(article.published_at)
    );

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

// Planlægger hovedfunktionen til at køre dagligt kl. 12:59:55
cron.schedule("55 59 12 * * *", () => {
  run();
});
