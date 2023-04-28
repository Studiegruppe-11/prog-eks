// users.route.js 
const express = require('express');
const router = express.Router();
const { executeSQL } = require('../controllers/executeSQL.js');



// denne SQL query henter alle users fra databasen ved at bruge executeSQL funktionen fra executeSQL.js. 

router.get('/users', async (req, res) => {
  try {
    const result = await executeSQL('SELECT * FROM users.users');
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}); 



module.exports = router;

