// Importer Express og opret en router
const express = require('express');
const router = express.Router();

// Importer to controller-funktioner til at håndtere forespørgsler til denne rute
const { getWeatherForecast, getHistoriskVejrData } = require('../controllers/weather.controller.js');

// hent vejrudsigt
router.get('/weatherForecast', getWeatherForecast);
// hent historisk vejrdata
router.get('/historiskVejrData', getHistoriskVejrData);

// Eksporter routeren, så den kan bruges af andre moduler
module.exports = router;
