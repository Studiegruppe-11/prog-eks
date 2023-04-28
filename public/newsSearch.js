const express = require("express");
const { Connection, Request } = require("tedious");
const config = require("./config.json");

async function fetchNewsData() {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);
    const query = "SELECT * FROM News";

    connection.on("connect", (error) => {
      if (error) {
        reject(error);
        return;
      }

      const request = new Request(query, (error, rowCount, rows) => {
        if (error) {
          reject(error);
          return;
        }
        connection.close();
      });

      const results = [];
      request.on("row", (columns) => {
        const row = {};
        columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
        });
        results.push(row);
      });

      request.on("requestCompleted", () => {
        resolve(results);
      });

      request.on("error", (error) => {
        reject(error);
      });

      connection.execSql(request);
    });

    connection.connect();
  });
}

module.exports = fetchNewsData;
