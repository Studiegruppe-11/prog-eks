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


//vis en enkelt nyhed med links og billede på en seperat side


router.get('/news/:newsIdClick', async (req, res) => {



  try {

    const newsIdClick = req.params.newsIdClick;

    const result = await executeSQL(`SELECT * FROM news WHERE news_id = ${newsIdClick}`);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }


});











module.exports = router;
