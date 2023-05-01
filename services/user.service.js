// services/user.service.js

const ConnectionPool = require("tedious-connection-pool");
const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;
const bcrypt = require("bcryptjs");

const connectionPool = require("../database/db.config");

async function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const request = new Request(
      `
      SELECT Id, Username, Password
      FROM users
      WHERE Username = @Username;
    `,
      (err, rowCount, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rowCount === 1) {
            const user = {
              id: rows[0][0].value,
              username: rows[0][1].value,
              password: rows[0][2].value,
            };
            resolve(user);
          } else {
            resolve(null);
          }
        }
      }
    );

    request.addParameter("Username", TYPES.NVarChar, username);
    executeRequest(request, resolve, reject);
  });
}

async function findUserById(id) {
  return new Promise((resolve, reject) => {
    const request = new Request(
      `
      SELECT Id, Username
      FROM users
      WHERE Id = @Id;
    `,
      (err, rowCount, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rowCount === 1) {
            const user = {
              id: rows[0][0].value,
              username: rows[0][1].value,
            };
            resolve(user);
          } else {
            resolve(null);
          }
        }
      }
    );

    request.addParameter("Id", TYPES.Int, id);
    executeRequest(request, resolve, reject);
  });
}

function executeRequest(request, resolve, reject) {
  connectionPool.acquire((err, connection) => {
    if (err) {
      reject(err);
    } else {
      connection.execSql(request);
      connection.release();
    }
  });
}

module.exports = {
  findUserByUsername,
  findUserById,
};
