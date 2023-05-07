// Import af nødvendige moduler
const cron = require("node-cron");
const axios = require("axios");
const { Connection, Request, TYPES } = require("tedious");
const config = require("../database/config.js");

// API-endpoint til vejrudsigten
const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&daily=weathercode,temperature_2m_max,sunrise,sunset&timezone=Europe%2FBerlin";

// SQL-forespørgsler til at slette og indsætte data
const deleteQuery = `
  DELETE FROM dbo.weatherForecast
`;

const insertQuery = `
  INSERT INTO dbo.weatherForecast (day, temperature, weathercode, sunrise, sunset)
  VALUES (@day, @temperature, @weatherCode, @sunrise, @sunset)
`;

// Asynkron funktion til at hente vejrdata og indsætte i en database
async function fetchWeatherDataAndInsert() {
  try {
    // Hent vejrdata fra API-endpointet
    const response = await axios.get(apiUrl);

    // Hvis der ikke er nogen data eller daglige data, log en fejl og afslut funktionen
    if (!response.data || !response.data.daily) {
      console.error("API response does not contain the expected data.");
      return;
    }

    // Hent den daglige vejrdata
    const weatherData = response.data.daily;

    // Opret en forbindelse til databasen
    const connection = new Connection(config);

    // Vent på at forbindelsen er oprettet, før du fortsætter
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

    // Slet eksisterende data fra tabellen
    await new Promise((resolve, reject) => {
      const request = new Request(deleteQuery, (error) => {
        if (error) {
          console.error("Error deleting old weather data:", error);
          reject(error);
        } else {
          console.log("Old weather data deleted successfully");
          resolve();
        }
      });
      connection.execSql(request);
    });

    // Loop gennem de første 7 dage af vejrdata og indsæt dem i databasen
    for (let i = 0; i < 7; i++) {
      const date = new Date(weatherData.time[i]);
      const temperature = weatherData.temperature_2m_max[i];
      const weatherCode = weatherData.weathercode[i];
      const sunrise = new Date(weatherData.sunrise[i]);
      const sunset = new Date(weatherData.sunset[i]);

      // Opret en SQL-forespørgsel til at indsætte vejrdata i databasen
      const request = new Request(insertQuery, (error) => {
        if (error) {
          console.error("Error inserting weather data:", error);
        }
      });

      // Tilføj parametre til SQL-forespørgslen
      request.addParameter("day", TYPES.DateTime, date);
      request.addParameter("temperature", TYPES.Float, temperature);
      request.addParameter("weatherCode", TYPES.Int, weatherCode);
      request.addParameter("sunrise", TYPES.DateTime, sunrise);
      request.addParameter("sunset", TYPES.DateTime, sunset);

      // Vent på at SQL-forespørgslen er fuldført, før der fortsættes
      await new Promise((resolve, reject) => {
        request.on("requestCompleted", () => resolve());
        request.on("error", (error) => reject(error));
        connection.execSql(request);
      });
    }

    console.log("All weather data inserted successfully");
  } catch (error) {
    console.error("Error fetching and inserting weather data:", error);
  }
}

// Planlagt funktionen til at køre hver dag kl. 14:00 ved hjælp a cron
cron.schedule("0 14 * * *", () => {
  fetchWeatherDataAndInsert();
});
