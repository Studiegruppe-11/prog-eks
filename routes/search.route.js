// search.route i routes
// Importer nødvendige moduler
const express = require("express");
const searchController = require("../controllers/search.controller");

// Opret en ny router
const router = express.Router();

// Definer en GET-rute til søgefunktionen
// Når en GET-anmodning sendes til denne rute ("/"), vil den udføre søgefunktionen i searchController
router.get("/", searchController.performSearch);

// Eksporter routeren, så den kan bruges i andre dele af programmet
module.exports = router;
