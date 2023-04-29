// users.route.js i mappen routes
const express = require('express');
const router = express.Router();
const { executeSQL } = require('../controllers/executeSQL.js');






router.get('/users', async (req, res) => {
    try {
      const result = await executeSQL('SELECT * FROM users');
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }); 


module.exports = router;


// nedenstående skal bruges senere



// denne SQL query henter alle users fra databasen ved at bruge executeSQL funktionen fra executeSQL.js. 



// indsæt ind i database når man opretter bruger

// router.post('/users/create', async (req, res) => {
//     const { name, favorite, username, password } = req.body;
  
//     try {
//       const result = await executeSQL(`INSERT INTO users (name, username, favorite, password) VALUES ('${name}', '${username}','${favorite}', '${password}')`);
//       res.send({ success: true, message: 'User created successfully.' });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send(error.message);
//     }
//   });




// router.post('/login', async (req, res) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.password;
//     const result = await executeSQL(`SELECT * FROM users WHERE username='${username}'`);
//     const user = result[1]; // assumes only one user is returned
//     if (!user) {
//       res.status(401).send({ error: 'Invalid credentials' });
//     } else if (user.password !== password) {
//       res.status(401).send({ error: 'Invalid credentials' });
//     } else {
//       // generate a token and send it back to the client
//       const token = generateToken(user);
//       res.send({ token });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });

// function generateToken(user) {
//   // generate a unique token based on the user's information
//   // store the token in a session or a cookie
//   // return the token to the client
// }

