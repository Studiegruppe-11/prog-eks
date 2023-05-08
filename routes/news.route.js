// news.route.js i mappen routes. 
const express = require("express");
const router = express.Router();
const { getAllNews, getSingleNews } = require("../controllers/news.controller.js");

// hent alle nyheder
router.get("/news", getAllNews);
// hent en enkelt nyhed ud fra news_id. 
router.get("/news/:newsIdClick", getSingleNews);

// eksporter routeren så den kan bruges i app.js
module.exports = router;

