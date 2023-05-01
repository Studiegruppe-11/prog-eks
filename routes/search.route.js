// const express = require("express");
// const router = express.Router();
// const { executeSQL } = require("../controllers/executeSQL.js");

// // Definerer en route for GET request
// router.get("/", async (req, res) => {
//   try {
//     const result = await executeSQL("SELECT * FROM dbo.News"); // Henter nyhedsdata fra databasen
//     res.json(result.recordset); // sender nyhedsdataene som et JSON objekt til klienten
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error fetching news data");
//   }
// });

// module.exports = router;

// // PUSH
