
// user.route.js i mappen routes. 
const express = require("express");
const router = express.Router();
const { login, create, getAllUsers, getLoggedInUser, logout, getFavorites, saveFavorites, saveReadArticles, getReadArticles, deleteUser, updateUser } = require("../controllers/users.controller.js");

// skal bruges for at analysere JSON-data, der sendes i anmodnings krop.
const bodyParser = require("body-parser");

// undersøg om login er korrekt.
router.post("/users/login", bodyParser.json(), login);

// opret bruger
// Får data fra opret.js og sender det til databasen.
router.post("/users/create", bodyParser.json(), create);

// Se alle brugere
router.get("/users", getAllUsers);

// login og gem navn
router.get("/loggedIn", getLoggedInUser);

// log ud 
router.post("/logout", logout);

// endpoint til at se brugerens favoritter
router.get("/favorites", getFavorites);

// gem favoritter
router.post("/favorites", bodyParser.json(), saveFavorites);

// gem user_id og news_id i read_articles
router.post("/readArticles", bodyParser.json(), saveReadArticles);


// find alle artikler en bruger har læst
router.get("/readArticles", getReadArticles);

// Slet Profil
// Delete user endpoint
router.delete("/users", deleteUser);


// Her laves route til opdatering af bruger (password)
router.put("/users/update", bodyParser.json(), updateUser);




module.exports = router;