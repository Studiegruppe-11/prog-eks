const express = require("express");
const router = express.Router();
const { getAllNews, getSingleNews } = require("../controllers/news.controller.js");




router.get("/news", getAllNews);

router.get("/news/:newsIdClick", getSingleNews);
 

module.exports = router;

 