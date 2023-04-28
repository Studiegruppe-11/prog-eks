// // Importerer nødvendige moduler
// const axios = require("axios");
// const { Connection, Request, TYPES } = require("tedious");
// const config = require("./Database/config.json");

// // Definerer API-url'et
// const apiUrl = "https://archive-api.open-meteo.com/v1/archive";

// // Definerer SQL-forespørgslen til at indsætte data i Weather-tabellen
// const insertQuery = `
//   INSERT INTO Weather (Date, Temperature, WeatherCode)
//   VALUES (@date, @temperature, @weatherCode)
// `;

// function formatDate(date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
// }

// async function fetchWeatherDataAndInsert() {
//     const currentDate = new Date();
//     const endDate = formatDate(currentDate);

//     currentDate.setDate(currentDate.getDate() - 30);
//     const startDate = formatDate(currentDate);

//     try {
//         const response = await axios.get(apiUrl, {
//             params: {
//                 latitude: 55.68,
//                 longitude: 12.57,
//                 start_date: startDate,
//                 end_date: endDate,
//                 daily: "weathercode,temperature_2m_mean",
//                 timezone: "Europe/Berlin",
//             },
//         });

//         // ##############################################################################################

//         // noget af ovenstående kan erstattes med denne kode for at vise vejret for de sidste 30 dage. Problemet er, at der ikke er nogen data for nogen af dagene.

//         // function formatDate(date) {
//         //     const year = date.getFullYear();
//         //     const month = String(date.getMonth() + 1).padStart(2, '0');
//         //     const day = String(date.getDate()).padStart(2, '0');
//         //     return `${year}-${month}-${day}`;
//         //   }

//         //   async function fetchWeatherDataAndInsert() {
//         //     const currentDate = new Date();
//         //     const endDate = formatDate(currentDate);

//         //     currentDate.setDate(currentDate.getDate() - 30);
//         //     const startDate = formatDate(currentDate);

//         //     try {
//         //       const response = await axios.get(apiUrl, {
//         //         params: {
//         //           latitude: 55.68,
//         //           longitude: 12.57,
//         //           start_date: startDate,
//         //           end_date: endDate,
//         //           daily: "weathercode,temperature_2m_mean",
//         //           timezone: "Europe/Berlin",
//         //         },
//         //       });
//         //

//         //       // ... (rest of the code remains unchanged)

//         // ##############################################################################################

//         // Tjekker, om responsen indeholder de forventede data
//         if (!response.data || !response.data.daily) {
//             console.error("API response does not contain the expected data.");
//             return;
//         }

//         // Henter de nødvendige data fra API-responsen
//         const weatherData = response.data.daily;
//         const timeData = weatherData.time;
//         const weathercodeData = weatherData.weathercode;
//         const temperatureData = weatherData.temperature_2m_mean;

//         // Opretter en forbindelse til databasen
//         const connection = new Connection(config);
//         await new Promise((resolve, reject) => {
//             connection.on("connect", (error) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve();
//                 }
//             });
//             connection.connect();
//         });

//         // Itererer over vejrdata og indsætter dem i databasen én ad gangen
//         for (let i = 0; i < timeData.length; i++) {
//             const date = timeData[i];
//             const temperature = temperatureData[i];
//             const weathercode = weathercodeData[i];

//             // Opretter en SQL-forespørgsel til at indsætte vejrdata
//             const request = new Request(insertQuery, (error) => {
//                 if (error) {
//                     console.error("Error inserting weather data:", error);
//                 }
//             });
//             request.addParameter("date", TYPES.Date, date);
//             request.addParameter("temperature", TYPES.Float, temperature);
//             request.addParameter("weathercode", TYPES.Int, weathercode);

//             // Indpakker execSql i et Promise for at sikre, at hver forespørgsel fuldføres,
//             // før den næste startes
//             await new Promise((resolve, reject) => {
//                 request.on("requestCompleted", () => resolve());
//                 request.on("error", (error) => reject(error));
//                 connection.execSql(request);
//             });
//         }

//         // Bekræfter, at alle vejrdata er blevet indsat i databasen
//         console.log("All weather data inserted successfully");
//     } catch (error) {
//         console.error("Error fetching and inserting weather data:", error);
//     }
// }

// // Kører funktionen for at hente og indsætte vejrdata
// fetchWeatherDataAndInsert();
