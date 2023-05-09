// search.route i routes
// Importer nødvendige moduler
const express = require("express");
// Opret en ny router
const router = express.Router();
// Importer funktionen performSearch fra search.controller
const { performSearch } = require("../controllers/search.controller");



// Definer en GET-rute til søgefunktionen
// Når en GET-anmodning sendes til denne rute ("/"), vil den udføre søgefunktionen i searchController
router.get("/", performSearch);

// Eksporter routeren, så den kan bruges i andre dele af programmet
module.exports = router;
