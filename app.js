//app.js i root
const express = require("express");
const app = express();


const newsRoutes = require("./routes/users.route");
const userRoutes = require("./routes/news.route");
const weatherRoutes = require("./routes/weather.route");


// // hvis den linje nedenuder er aktiv fetcher den hele tiden til DB. derfor ikke gør den aktiv
//const newsToDB = require("./fetcherToDB/newsToDB");


// end point til at hente api'er. 
app.use("/", newsRoutes);
app.use("/", userRoutes);
app.use("/", weatherRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});



// til index.html så vi kan åbne localhost 3000 /index.html
app.use(express.static("public"));




