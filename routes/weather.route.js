const express = require('express');
const router = express.Router();
const { getWeatherForecast, getHistoriskVejrData } = require('../controllers/weather.controller.js');

router.get('/weatherForecast', getWeatherForecast);
router.get('/historiskVejrData', getHistoriskVejrData);

module.exports = router;

