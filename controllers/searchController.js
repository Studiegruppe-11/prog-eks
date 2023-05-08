const mssql = require("mssql");

const config = require("../database/config.js");

exports.performSearch = async (req, res) => {
  const searchQuery = req.query.query;
  const client = new mssql.ConnectionPool(config);

  try {
    await client.connect();

    // Replace with your actual database query
    const searchResult = await client.query(`
      SELECT * FROM dbo.News
      WHERE LOWER(title) LIKE LOWER('%${searchQuery}%')
      OR LOWER(author) LIKE LOWER('%${searchQuery}%')
      OR LOWER(description) LIKE LOWER('%${searchQuery}%')
    `);

    res.status(200).json(searchResult.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while searching the database" });
  } finally {
    await client.close();
  }
};
