const express = require('express');
const router = express.Router();
const { executeSQL } = require('../controllers/executeSQL.js');



// denne SQL query henter alle news fra databasen ved at bruge executeSQL funktionen fra executeSQL.js. 

router.get('/news', async (req, res) => {
  try {
    const result = await executeSQL('SELECT * FROM dbo.News');
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});





module.exports = router;
