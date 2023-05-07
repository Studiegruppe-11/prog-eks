// users.controller.js i mappen controller
// skal bruges til at udføre SQL-queries
const { executeSQL } = require("./executeSQL.js");

// undersøg om login er korrekt.
async function login(req, res) {
  const { username, password } = req.body;
  // tager navne fra login.js og ser om det passer med databasen.
  const result = await executeSQL(
    `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
  );
  if (Object.keys(result).length > 0) {
    // Hvis der er mindst et resultat fra databasen

    const user = result[1];

    // Gem brugerens id og navn i express-session
    req.session.userId = user.user_id;
    req.session.name = user.name;

    // Send svar tilbage til klienten
    res.json({ success: true });
  } else {
    res.json({ error: "Forkert brugernavn eller adgangskode" });
  }
};

// opret bruger
// Får data fra opret.js og sender det til databasen.
async function create(req, res) {
  const { name, favorite, username, password } = req.body;

  // Udfør SQL-queries med variablerne
  const result = await executeSQL(
    `INSERT INTO users (name, favorite, username, password) VALUES ('${name}', '${favorite}', '${username}', '${password}')`
  );

  res.json(result);
};

// Se alle brugere
async function getAllUsers(req, res) {
  try {
    const result = await executeSQL(`SELECT * FROM users `);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// login og gem navn
async function getLoggedInUser(req, res) {
  const { userId, name } = req.session;
  if (userId && name) {
    res.json({ userId, name });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};


// log ud
async function logout(req, res) {
  try {
    await new Promise((resolve, reject) => {
      // slet brugerens id og navn fra express-session
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

// En async funktion, der håndterer GET-forespørgsler til '/favorites'-endpointet.
// Funktionen henter de favorit-artikler, der er tilknyttet bruger-id'et fra sessionen i databasen.
async function getFavorites(req, res) {
  try {
    // Udfør en SQL-forespørgsel for at hente favorit-artiklerne fra databasen.
    // Resultatet er en række af nyheds-artikler, der er tilknyttet bruger-id'et.
    const result = await executeSQL(`SELECT news.title, news.author, news.url, news.imageUrl
      FROM favorite_articles
      INNER JOIN news ON favorite_articles.news_id = news.news_id
      WHERE favorite_articles.user_id = ${req.session.userId} `);

    // Send resultatet tilbage til klienten i JSON-format.
    res.send(result);
  } catch (error) {
    // Hvis der opstår en fejl under udførelsen af SQL-forespørgslen, send en fejlbesked til klienten.
    console.log(error);
    res.status(500).send(error.message);
  }
}

// gem favoritter
async function saveFavorites(req, res) {
  // news_id bliver gemt i scriptnews.js
  const news_id = req.body.news_id;
  const result = await executeSQL(
    // gemmer news_id og user_id i favorite_articles
    `INSERT INTO favorite_articles (news_id, user_id) VALUES ('${news_id}', '${req.session.userId}')`
  );
  res.json(result);
}

// gem user_id og news_id i read_articles
async function saveReadArticles(req, res) {
  // news_id bliver gemt i scriptnews.js
  const news_id = req.body.news_id;
  const result = await executeSQL(
    // indsæt brugerens id og news_id i read_articles tabellen. 
    `INSERT INTO read_articles (news_id, user_id) VALUES ('${news_id}', '${req.session.userId}')`
  );
  res.json(result);
}



// se alle artikler en brugeren har læst. bruger her session id til at finde brugeren, som er den bruger der er logget ind. 
// herefter et innerjoin mellem news, readarticles og user. 
async function getReadArticles(req, res) {
  try {
    const result = await executeSQL(`SELECT news.title, news.author, news.url, news.imageUrl
      FROM read_articles
      INNER JOIN news ON read_articles.news_id = news.news_id
      WHERE read_articles.user_id = ${req.session.userId}`);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}


// slet bruger. sletter først alle artikler og læsteartikler brugeren har gemt og derefter brugeren, da der er foreign keys i databasen.
async function deleteUser(req, res) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      res.status(401).send("Bruger er ikke logget ind");
      return;
    }
    await executeSQL(`DELETE FROM favorite_articles WHERE user_id=${userId}`);
    await executeSQL(`DELETE FROM read_articles WHERE user_id=${userId}`);
    await executeSQL(`DELETE FROM users WHERE user_id=${userId}`);
    req.session.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}


// opdater bruger. bruger her session id til at finde brugeren, som er den bruger der er logget ind.
async function updateUser(req, res) {
  try {
    const userId = req.session.userId;
    const password = req.body.password;
    // set nu det nye password i stedet for det gamle, på den bruger der er logget ind.
    await executeSQL(`UPDATE users SET password = ${password} WHERE user_id = ${userId}`);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}


// eksporter funktionerne til brug i routes.js
module.exports = {
  login,
  create,
  getAllUsers,
  getLoggedInUser,
  logout,
  getFavorites,
  saveFavorites,
  saveReadArticles,
  getReadArticles,
  deleteUser,
  updateUser,
};

 

