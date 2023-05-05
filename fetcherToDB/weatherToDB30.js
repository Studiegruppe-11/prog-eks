const cron = require("node-cron");
//GitHub-side.
// Import necessary modules
const axios = require("axios");
const { Connection, Request, TYPES } = require("tedious");
const config = require("../database/config.js");

// Define Visual Crossing Weather API URL
const apiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/copenhagen/last30days?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Csunrise%2Csunset%2Cicon&include=days&key=ZRWAZ52ZTKWTNB7BDFVB4M7NQ&contentType=json";

// Define SQL query to insert data into Weather table
const insertQuery = `
  INSERT INTO dbo.weatherLastThirty (date, temp, icon)
  VALUES (@date, @temperature, @weatherIcon)
`;

async function fetchWeatherDataAndInsert() {
  try {
    const response = await axios.get(apiUrl);

    // Check if the response contains the expected data
    if (!response.data || !response.data.days) {
      console.error("API response does not contain the expected data.");
      return;
    }

    // Extract the necessary data from the API response
    const weatherData = response.data.days;

    // Create a connection to the database
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

    // Iterate over weather data and insert them into the database one by one
    for (const day of weatherData) {
      const date = day.datetime;
      const temperature = day.temp;
      const weatherIcon = day.icon;

      // Create a SQL request to insert weather data
      const request = new Request(insertQuery, (error) => {
        if (error) {
          console.error("Error inserting weather data:", error);
        }
      });
      request.addParameter("date", TYPES.Date, date);
      request.addParameter("temperature", TYPES.Float, temperature);
      request.addParameter("weatherIcon", TYPES.NVarChar, weatherIcon);

      // Wrap execSql in a Promise to ensure that each request completes
      // before the next one starts
      await new Promise((resolve, reject) => {
        request.on("requestCompleted", () => resolve());
        request.on("error", (error) => reject(error));
        connection.execSql(request);
      });
    }

    // Confirm that all weather data has been inserted into the database
    console.log("All weather data inserted successfully");
  } catch (error) {
    console.error("Error fetching and inserting weather data:", error);
  }
}

// Run the function to fetch and insert weather data

// Sat til at køre kl 14 hver dag

cron.schedule("0 14 * * *", () => {
  fetchWeatherDataAndInsert();
});
