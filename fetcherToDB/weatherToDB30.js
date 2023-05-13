// Importer nødvendige moduler og konfigurationsfiler
const cron = require("node-cron");
const axios = require("axios");
const { Connection, Request, TYPES } = require("tedious");
const config = require("../database/config.js");
require("dotenv").config({ path: "../.env" });

// Definer Visual Crossing Weather API URL
const apiKey = process.env.weather;
const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/copenhagen/last30days?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Csunrise%2Csunset%2Cicon&include=days&key=${apiKey}&contentType=json`;

// Definer SQL forespørgsel til at indsætte data i Weather tabellen
const insertQuery = `
  INSERT INTO dbo.weatherLastThirty (date, temp, icon)
  VALUES (@date, @temperature, @weatherIcon)
`;

async function fetchWeatherDataAndInsert() {
  try {
    const response = await axios.get(apiUrl);

    // Tjek om svaret indeholder de forventede data
    if (!response.data || !response.data.days) {
      console.error("API-svaret indeholder ikke de forventede data.");
      return;
    }

    // Udpak de nødvendige data fra API-svaret
    const weatherData = response.data.days;

    // Opret en forbindelse til databasen
    const connection = new Connection(config);
    await new Promise((resolve, reject) => {
      connection.on("connect", (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
      connection.connect();
    });

    // Gennemgå vejret data og indsætte dem i databasen en efter en
    for (const day of weatherData) {
      const date = day.datetime;
      const temperature = day.temp;
      const weatherIcon = day.icon;

      // Opret en SQL-anmodning til at indsætte vejret data
      const request = new Request(insertQuery, (error) => {
        if (error) {
          console.error("Fejl ved indsættelse af vejret data:", error);
        }
      });
      request.addParameter("date", TYPES.Date, date);
      request.addParameter("temperature", TYPES.Float, temperature);
      request.addParameter("weatherIcon", TYPES.NVarChar, weatherIcon);

      // Indpak execSql i en Promise for at sikre, at hver anmodning fuldføres
      // før den næste starter
      await new Promise((resolve, reject) => {
        request.on("requestCompleted", () => resolve());
        request.on("error", (error) => reject(error));
        connection.execSql(request);
      }); 
    }

    // Bekræft, at alle vejrdata er indsat i databasen
    console.log("Alle vejrdata indsat med succes");
  } catch (error) {
    console.error("Fejl ved hentning og indsættelse af vejrdata:", error);
  }
}

// Sat til at køre kl 14 hver dag
cron.schedule("0 14 * * *", () => {
  fetchWeatherDataAndInsert(); 
});

