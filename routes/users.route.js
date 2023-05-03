//users.route.js i mappen routes
const express = require('express');
const router = express.Router();
const { executeSQL } = require('../controllers/executeSQL.js');
// skal bruges for at analysere JSON-data, der sendes i anmodnings krop. 
const bodyParser = require('body-parser');

// undersøg om login er korrekt.
router.post('/users/login', bodyParser.json(), async (req, res) => {
  const { username, password } = req.body;
  // tager navne fra login.js og ser om det passer med databasen.
  const result = await executeSQL(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`);
  console.log(result[1].user_id);
  if (Object.keys(result).length > 0) { // Hvis der er mindst et resultat fra databasen


    const user = result[1];

    // Gem brugerens id og navn i express-session
    req.session.userId = user.user_id;
    req.session.name = user.name;

    res.json({ success: true });
  } else {
    res.json({ error: "Forkert brugernavn eller adgangskode" });
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
    const result = await executeSQL(`SELECT * FROM users `);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});


// login og gem navn
router.get('/loggedIn', (req, res) => {
  const { userId, name } = req.session;
  if (userId && name) {
    res.json({ userId, name });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


// log ud
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});







// endpoint til at se brugerens favoritter
router.get('/favorites', async (req, res) => {
  try {
    const result = await executeSQL(`SELECT * FROM favoritArtikler WHERE user_id = ${req.session.userId} `);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});





// IK SLET HERFRA



// router.get('/loggedInUser', async (req, res) => {
//   try {
//     const loggedInUser = await executeSQL(`SELECT user_id, name FROM users WHERE username='${username}' AND password='${password}'`);
//     res.send(loggedInUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });


    // TIL HER
















