const express = require('express');
const router = express.Router();
const { executeSQL } = require('../controllers/executeSQL.js');

// This route gets all the weather data from the database using the executeSQL function from executeSQL.js


router.get('/weatherForecast', async (req, res) => {
  try {
    const result = await executeSQL('SELECT * FROM weatherForecast');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



router.get('/historiskVejrData', async (req, res) => {
  try {
    const result = await executeSQL('SELECT * FROM weatherLastThirty');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});








module.exports = router;


