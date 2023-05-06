const { executeSQL } = require("../controllers/executeSQL.js");



// hent alle nyheder fra databasen
async function getAllNews(req, res) {
  try {
    const result = await executeSQL("SELECT * FROM news");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}


// hent en enkelt nyhed og billede når man klikker på den pågælden nyhed. 

async function getSingleNews(req, res) {
  try {
    const newsIdClick = req.params.newsIdClick;

    const result = await executeSQL(
      `SELECT * FROM news WHERE news_id = ${newsIdClick}`
    );


    const title = result[1].title;
    const imageUrl = result[1].imageUrl;
    const description = result[1].description;
    const author = result[1].author;
    const url = result[1].url;


    // her oprettes en html side med links og billeder og tekst til den nyhed der er blevet klikket på. 
    res.send(`
      <html>
        <head>
          <title>${title}</title>

          <style>
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <img src="${imageUrl}" width="600" height="450">
          <p>${description}</p>
          <p>${author}</p>
          <a href="${url}">Læs mere</a>
    <br>
    <br>

    <button id="emailBtn"> Del med E-mail </button>

        </body>

        <script>

        document.getElementById("emailBtn").addEventListener("click", function() {

          window.open("mailto:?subject=Se denne nyhed&body= Se denne artikel, som jeg lige har læst. ${url}");

        });
      
        </script>

      </html>
    `);


  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

}


module.exports = { getAllNews, getSingleNews };