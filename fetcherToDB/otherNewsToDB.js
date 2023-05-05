const cron = require("node-cron");
const axios = require("axios");
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;
require("dotenv").config({ path: "../.env" });

const config = require("../database/config.json");
const apiKey = process.env.news2;

const connection = new Connection(config);

function connect() {
  return new Promise((resolve, reject) => {
    connection.on("connect", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Connected to Azure SQL Database");
        resolve();
      }
    });

    connection.connect();
  });
}

async function run() {
  try {
    await connect();
    await fetchNewsData();
    console.log("All news articles inserted successfully");
  } catch (error) {
    console.error("Error inserting news articles:", error);
  }
}

async function fetchNewsData() {
  const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&language=en&limit=10`;
  console.log("Dette er url:", url);

  const response = await axios.get(url);

  console.log("Fetched news data successfully");
  const articles = response.data.data;
  const promises = articles.map(insertNewsData);
  await Promise.all(promises);
}

const requestQueue = [];

async function insertNewsData(article) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
            INSERT INTO News (title, author, description, url, publishedAt, imageUrl)
      VALUES (@title, @author, @description, @url, @publishedAt, @imageUrl);
    `;

    const request = new Request(insertQuery, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Query finished executing");
        resolve();
        executeNextRequest();
      }
    });

    request.addParameter("author", TYPES.NVarChar, article.author);
    request.addParameter("title", TYPES.NVarChar, article.title);
    request.addParameter("description", TYPES.NVarChar, article.description);
    request.addParameter("url", TYPES.NVarChar, article.url);
    request.addParameter("imageUrl", TYPES.NVarChar, article.image);
    request.addParameter(
      "publishedAt",
      TYPES.DateTime2,
      new Date(article.published_at)
    );

    requestQueue.push(request);

    if (requestQueue.length === 1) {
      // If this is the first request, execute it immediately
      connection.execSql(requestQueue[0]);
    }
  });
}

function executeNextRequest() {
  // Remove the completed request from the queue and execute the next request (if any)
  requestQueue.shift();

  if (requestQueue.length > 0) {
    connection.execSql(requestQueue[0]);
  }
}

// Kaldes nu med cron i stedet, derfor udkommenteret.
run();

//Er sat til at køre hver dag kl 14:00
// cron.schedule("0 14 * * *", () => {
//   run();
// });
