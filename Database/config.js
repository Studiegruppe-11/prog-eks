require("dotenv").config({ path: "../.env" });

// FIND UD AF HVORFOR ANDRE FILER FUCKER NÅR DE SKAL IMPORTE

let config = {
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


module.exports = config;
