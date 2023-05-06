const { executeSQL } = require('../controllers/executeSQL.js');

// This function gets all the weather data from the database using the executeSQL function from executeSQL.js

//henter alt fra weatherForecast tabellen som vi bruger i vores vejrudsigt
async function getWeatherForecast(req, res) {
  try {
    const result = await executeSQL('SELECT * FROM weatherForecast');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

// henter alt fra historiskevejrdata tabellen som vi bruger til at se historisk vejr
async function getHistoriskVejrData(req, res) {
  try {
    // skal tage de sidste 30 rækker fra tabellen. 
    const result = await executeSQL('SELECT top (30) * FROM weatherLastThirty ORDER BY Id DESC');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

module.exports = {
  getWeatherForecast,
  getHistoriskVejrData
};



