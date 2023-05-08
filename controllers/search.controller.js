const mssql = require("mssql");

const config = require("../database/config.js");

exports.performSearch = async (req, res) => {
  const searchQuery = req.query.query;
  const client = new mssql.ConnectionPool(config);

  try {
    await client.connect();
    // Erstat med din faktiske database forespørgsel
    const searchResult = await client.query(`
  SELECT * FROM dbo.News
  WHERE LOWER(title) LIKE LOWER('%${searchQuery}%')
  OR LOWER(author) LIKE LOWER('%${searchQuery}%')
  OR LOWER(description) LIKE LOWER('%${searchQuery}%')
`);

    // Send resultatet med statuskode 200
    res.status(200).json(searchResult.recordset);
  } catch (err) {
    console.error(err);
    // Send fejlbesked med statuskode 500, hvis der opstår en fejl
    res
      .status(500)
      .json({ error: "Der opstod en fejl under søgning i databasen" });
  } finally {
    // Luk forbindelsen til databasen
    await client.close();
  }
};
