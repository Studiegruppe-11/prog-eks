// Importer Express frameworket og opret en instans af Express applikationen
const express = require("express");
const app = express();
const cors = require("cors");
const { client } = require("mssql"); // Irrelevant at importere denne her, da vi ikke bruger den

// Hent miljøvariabler fra .env filen
require("dotenv").config();

// Importer body-parser modulet for at analysere JSON-data i anmodningens krop
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importer express-session modulet for at gemme brugeroplysninger i sessionen
const session = require("express-session");

// Tilføj session middleware til Express appen
// https://www.npmjs.com/package/express-session
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware funktion til at håndtere CORS. Lavet det nogen af os fik en fejl med CORS, da vi åbnede localhost
app.use((req, res, next) => {
  // Sætter tilladte oprindelsesdomæner for CORS i headeren
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000, http://127.0.0.1:3000"
  );
  // Sætter tilladte headers for CORS i headeren
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Kalder næste middleware i rækken
  next(); // Ikke relevant med next() her, skulle have været i middleware funktionen over
});

// Importer ruter til bruger, nyheder og vejr fra separate filer
const newsRoutes = require("./routes/users.route");
const userRoutes = require("./routes/news.route");
const weatherRoutes = require("./routes/weather.route");
const searchRoutes = require("./routes/search.route");

// Importer moduler til at hente data fra API'er og gemme dem i databasen. De er sat til at køre hver dag kl 14.00
require("./fetcherToDB/newsToDB");
require("./fetcherToDB/otherNewsToDB");
require("./fetcherToDB/weatherToDB30");
require("./fetcherToDB/forecastToDB");

// Tilføj router til Express appen
app.use("/", newsRoutes); // Vi kunne have defineret de forskellige endpoints her fremfor i routes filerner hver i sær. Ligesom ved seearch routeren
app.use("/", userRoutes);
app.use("/", weatherRoutes);
app.use("/search", searchRoutes);

// Lyt på port 3000 og console.log en besked, når serveren er startet.
app.listen(3000, () => {
  console.log("App listening on port 3000");
});

// Konfigurer Express appen til at servere statiske filer fra public mappen, som indeholder index.html filen
app.use(express.static("public"));
