//app.js i root
const express = require("express");
const app = express();

const session = require("express-session");
// Tilføj session middleware
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// hent routes
const newsRoutes = require("./routes/users.route");
const userRoutes = require("./routes/news.route");
const weatherRoutes = require("./routes/weather.route");

// // hvis den linje nedenuder er aktiv fetcher den hele tiden til DB. derfor ikke gør den aktiv
const newsToDB = require("./fetcherToDB/newsToDB");
const otherNewsToDB = require("./fetcherToDB/otherNewsToDB");
const weatherToDB = require("./fetcherToDB/weatherToDB30");
const forecastToDB = require("./fetcherToDB/forecastToDB");

// end point til at hente api'er.
app.use("/", newsRoutes);
app.use("/", userRoutes);
app.use("/", weatherRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

// til index.html så vi kan åbne localhost 3000 /index.html
app.use(express.static("public"));
