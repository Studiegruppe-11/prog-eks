// controllers/executeSQL.js

// Hele dette dokument bruges til at håndtere forbindelsen til databasen og udføre SQL-queries. Så jeg i andre routes kan kalde på denne fil og udføre SQL-queries
// taget fra Hait.cbss.dk

const Connection = require("tedious").Connection;
const Request = require("tedious").Request;

// Variables
const config = require("../database/config.js");

// Function that returns a promise
const executeSQL = (query) => {
  return new Promise((resolve, reject) => {
    // Connection variable
    const connection = new Connection(config);

    // Make a request
    const request = new Request(query, function (err) {
      if (err) {
        reject(err);
      }
    });

    // When a connection is established
    connection.on("connect", function (err) {
      if (err) {
        reject(err);
      } else {
        // Log that we connected to the DB
        console.log("Connected to the database");

        // Execute SQL
        connection.execSql(request);
      }
    });

    // Connect
    connection.connect();

    // Row counter (would remove this and do clean arrays instead)
    let counter = 1;
    let response = {};

    // Do something on row
    request.on("row", function (columns) {
      response[counter] = {};
      columns.forEach(function (column) {
        response[counter][column.metadata.colName] = column.value;
      });
      counter += 1;
    });

    // Resolve when the request is completed
    request.on("requestCompleted", () => {
      resolve(response);
    });
  });
};

module.exports = { executeSQL };
