// search.controller i controllers
// Importer mssql modulet
const mssql = require("mssql");

// Importer databasens konfigurationsfil
const config = require("../database/config.js");

// Eksporter funktionen performSearch
exports.performSearch = async (req, res) => {
  // Hent søgeforespørgslen fra forespørgslens query parametre
  const searchQuery = req.query.query;

  // Opret en ny forbindelsespool ved hjælp af konfigurationsobjektet
  const client = new mssql.ConnectionPool(config);

  try {
    // Opret forbindelse til databasen
    await client.connect();

    // Udfør SQL-forespørgslen
    const searchResult = await client.query(`
      SELECT * FROM dbo.News
      WHERE LOWER(title) LIKE LOWER('%${searchQuery}%')
      OR LOWER(author) LIKE LOWER('%${searchQuery}%')
      OR LOWER(description) LIKE LOWER('%${searchQuery}%')
    `);

    // Send søge resultatet tilbage til klienten med statuskode 200
    res.status(200).json(searchResult.recordset);
  } catch (err) {
    // Log eventuelle fejl til konsollen
    console.error(err);

    // Send en fejlmeddelelse tilbage til klienten med statuskode 500, hvis der opstår en fejl
    res
      .status(500)
      .json({ error: "Der opstod en fejl under søgning i databasen" });
  } finally {
    // Luk forbindelsen til databasen
    await client.close();
  }
};
