// Importer Express frameworket og opret en instans af Express applikationen
const express = require("express");
const app = express();

// Hent miljøvariabler fra .env filen
require("dotenv").config();

// Importer body-parser modulet for at analysere JSON-data i anmodningens krop
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importer express-session modulet for at gemme brugeroplysninger i sessionen
const session = require("express-session");

// Tilføj session middleware til Express appen
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// ##### CORS START #####

// Lavet for at gå uden om CORS
// Ideelt set (sikkerhedsmæssigt) skal det være en whitelist med tilladte domæner, men vi har tilføjet alle for simplicitet
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000, http://127.0.0.1:3000"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ##### CORS SLUT #####

// Importer ruter til bruger, nyheder og vejr fra separate filer
const newsRoutes = require("./routes/users.route");
const userRoutes = require("./routes/news.route");
const weatherRoutes = require("./routes/weather.route");

// Importer moduler til at hente data fra API'er og gemme dem i databasen. De er sat til at køre hver dag kl 14.00.
const newsToDB = require("./fetcherToDB/newsToDB");
const otherNewsToDB = require("./fetcherToDB/otherNewsToDB");
const weatherToDB = require("./fetcherToDB/weatherToDB30");
const forecastToDB = require("./fetcherToDB/forecastToDB");

// Tilføj ruter til Express appen
app.use("/", newsRoutes);
app.use("/", userRoutes);
app.use("/", weatherRoutes);

// Lyt på port 3000 og console.log en besked, når serveren er startet.
app.listen(3000, () => {
  console.log("App listening on port 3000");
});

// Konfigurer Express appen til at servere statiske filer fra public mappen, som indeholder index.html filen
app.use(express.static("public"));
