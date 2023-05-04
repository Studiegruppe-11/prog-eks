
const cron = require('node-cron');
//GitHub-side.
const axios = require("axios");
const { Connection, Request, TYPES } = require("tedious");
const config = require("../database/config.json");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&daily=weathercode,temperature_2m_max,sunrise,sunset&timezone=Europe%2FBerlin";

const deleteQuery = `
  DELETE FROM dbo.weatherForecast
`;

const insertQuery = `
  INSERT INTO dbo.weatherForecast (day, temperature, weathercode, sunrise, sunset)
  VALUES (@day, @temperature, @weatherCode, @sunrise, @sunset)
`;

async function fetchWeatherDataAndInsert() {
  try {
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.daily) {
      console.error("API response does not contain the expected data.");
      return;
    }

    const weatherData = response.data.daily;
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

    // Delete existing data from the table
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

    for (let i = 0; i < 7; i++) {
      const date = new Date(weatherData.time[i]);
      const temperature = weatherData.temperature_2m_max[i];
      const weatherCode = weatherData.weathercode[i];
      const sunrise = new Date(weatherData.sunrise[i]);
      const sunset = new Date(weatherData.sunset[i]);

      const request = new Request(insertQuery, (error) => {
        if (error) {
          console.error("Error inserting weather data:", error);
        }
      });
      request.addParameter("day", TYPES.DateTime, date);
      request.addParameter("temperature", TYPES.Float, temperature);
      request.addParameter("weatherCode", TYPES.Int, weatherCode);
      request.addParameter("sunrise", TYPES.DateTime, sunrise);
      request.addParameter("sunset", TYPES.DateTime, sunset);

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
// Sat til at køre kl 14 hver dag
cron.schedule('0 14 * * *', () => {
  fetchWeatherDataAndInsert();
});