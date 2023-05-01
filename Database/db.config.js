// config/db.config.js

const ConnectionPool = require("tedious-connection-pool");
const config = require("./config.json");

const poolConfig = {
  min: 2,
  max: 4,
  log: true,
};

const connectionPool = new ConnectionPool(poolConfig, config);
connectionPool.on("error", (err) => {
  console.error(err);
});

module.exports = connectionPool;
