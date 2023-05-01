const express = require("express"); // importerer Express frameworket
const router = express.Router(); // initialiserer Express router objektet
const axios = require("axios"); // importerer axios HTTP biblioteket

// Definerer en route for GET request
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/news"); // kalder news API endpointet for at hente nyhedsdata
    const newsData = response.data; // gemmer nyhedsdataene i en variabel
    res.json(newsData); // sender nyhedsdataene som et JSON objekt til klienten
  } catch (error) {
    console.error(error); // log fejlbeskeden til konsollen
    res.status(500).send("Error fetching news data"); // sender en HTTP fejlbesked til klienten
  }
});

module.exports = router; // eksporter router objektet, så det kan bruges i andre filer
