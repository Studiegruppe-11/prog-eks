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
  
  if (Object.keys(result).length> 0 ) { // Hvis der er mindst et resultat fra databasen
    res.json({ success: true }); // Send JSON tilbage med success sat til true


    // hvis password og brugernavn stemmer overens oprettes dette endpoint som gemmer brugerens navn i http://localhost:3000/loggedInUser. 
    // som jeg senere bruger i overall.js til at tjekke om der er en bruger logget ind.
    router.get('/loggedInUser', async (req, res) => {
      try {
        const loggedInUser = await executeSQL(`SELECT id, name FROM users WHERE username='${username}' AND password='${password}'`);
        res.send(loggedInUser);
      } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
      }
    }); 

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





// Nedenunder er en test for at se alle brugere. 

router.get('/users', async (req, res) => {
  try {
    const result = await executeSQL(`SELECT id, name FROM users WHERE username='${username}' AND password='${password}'`);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}); 


// Log ud funktion 
router.delete('/loggedInUser', (req, res) => {
  // Fjern dataen i loggedInUser
  loggedInUser = null;
  res.redirect('/index.html'); // Omdiriger til index.html efter sletning
});




// routes 


  













//Skal bruges til at importere data fra opret.js til databasen.
// const { userData } = require('../public/opret.js');

// TEST SOM IKKE VIRKER
// router.post('/users', async (req, res) => {
//   try {
//     const { name, favorite, username, password } = req.body;
//     const query = `INSERT INTO users (name, favorite, username, password) VALUES (?, ?, ?, ?)`;
//     const result = await executeSQL(query, [name, favorite, username, password]);
//     res.send(`Data blev tilføjet til users-tabellen: ${JSON.stringify(req.body)}`);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });


