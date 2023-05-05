const { Connection, Request } = require("tedious");
require("dotenv").config({ path: "../.env" });

// FIND UD AF HVORFOR ANDRE FILER FUCKER NÅR DE SKAL IMPORTE

const config = {
  server: process.env.DB_SERVER,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    encrypt: true,
    database: process.env.DB_NAME,
  },
};

console.log(process.env.DB_SERVER);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);

module.exports = { Connection, Request, config };
