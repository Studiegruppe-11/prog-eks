//users.route.js i mappen routes
const express = require('express');
const router = express.Router();
const { executeSQL } = require('../controllers/executeSQL.js');
// skal bruges for at analysere JSON-data, der sendes i anmodnings krop. 
const bodyParser = require('body-parser');
const session = require('express-session')


// undersøg om login er korrekt.
router.post('/users/login', bodyParser.json(), async (req, res) => {
  const { username, password } = req.body;
  // tager navne fra login.js og ser om det passer med databasen.
  const result = await executeSQL(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`);
  console.log(result[1].user_id);
  if (Object.keys(result).length > 0) { // Hvis der er mindst et resultat fra databasen
    res.json({ success: true }); // Send JSON tilbage med success sat til true


    // req.session.userId = result[1].user_id;
    // req.session.username = result[1].username;



  } else { // Hvis der ikke er nogen resultater i databasen
    res.json({ error: "Forkert brugernavn eller adgangskode" }); // Send JSON tilbage med en fejlmeddelelse
  }
});


// opret bruger
// Får data fra opret.js og sender det til databasen.
router.post('/users/create', bodyParser.json(), async (req, res) => {
  const { name, favorite, username, password } = req.body;

  // Udfør SQL-queries med variablerne
  const result = await executeSQL(`INSERT INTO users (name, favorite, username, password) VALUES ('${name}', '${favorite}', '${username}', '${password}')`);

  res.json(result);
});


module.exports = router;






// Se alle brugere
router.get('/users', async (req, res) => {
  try {
    const result = await executeSQL(`SELECT * FROM users WHERE username='gustavzeuthen' AND password='123'`);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});







// IK SLET HERFRA



router.get('/loggedInUser', async (req, res) => {
  try {
    const loggedInUser = await executeSQL(`SELECT user_id, name FROM users WHERE username='${username}' AND password='${password}'`);
    res.send(loggedInUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});


    // TIL HER
















