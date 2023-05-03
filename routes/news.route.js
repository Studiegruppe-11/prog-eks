const express = require("express");
const router = express.Router();
const { executeSQL } = require("../controllers/executeSQL.js");

// GET request handler for fetching news data
router.get("/news", async (req, res) => {
  try {



    const result = await executeSQL("SELECT * FROM news");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
