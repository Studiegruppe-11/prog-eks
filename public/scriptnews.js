window.addEventListener("DOMContentLoaded", async () => {

  async function getData() {
    let obj;

    let key = await fetch("key.json");
    key = await key.json();
    let apikey = (key.apikey);


    // fra gamle opgave api
    //https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}


    const res = await fetch(`http://localhost:3000/news`) // api-key er gemt i en json fil, så den er skjult. 
    // kun US nyheder. 

    obj = await res.json();

    return obj
  }

  getData();

  let data = await getData();



let headnews = [];
let imgnews = [];
let newspaper = [];
let urlnews = [];




for (let i = 0; i < 7; i++) {

  headnews[i] = data[(i+1).toString()].title;
  newspaper[i] = headnews[i].substr(headnews[i].lastIndexOf("-") + 1).trim();
  headnews[i] = headnews[i].substr(0, headnews[i].lastIndexOf("-")).trim();
  
  imgnews[i] = data[(i+1).toString()].imageUrl;
  urlnews[i] = data[(i+1).toString()].url;

  console.log(urlnews[i])


  document.getElementById(`headnews${i}`).innerHTML = headnews[i];
  document.getElementById(`imgnews${i}`).innerHTML = '<img src="'+imgnews[i]+'">';
  document.getElementById(`newspaper${i}`).innerHTML = newspaper[i];
  document.getElementById(`linknews${i}`).innerHTML = '<a href="'+urlnews[i]+'">Læs mere</a>';


} 







  // Hvis man klikker på det røde hjerte, så gemmes nyheden i localstorage
  for (let i = 0; i < 7; i++) {
    document.getElementById(`news${i}save`).addEventListener("click", function () {
      if (localStorage.getItem('Success') === 'true') {      // Man skal være logget ind. '
        alert("Nyheden er gemt i favoritter"); // Alert, der siger at den er gemt.
        
        user.favoriteArticles.articleTitel =[];
        user.favoriteArticles.articleUrl = [];
        user.favoriteArticles.articleImg = [];
        user.favoriteArticles.articleNewspaper = [];

        
        user.favoriteArticles.articleTitel[i] = data.articles[i].title;
        user.favoriteArticles.articleUrl[i] = data.articles[i].url;
        user.favoriteArticles.articleImg[i] = data.articles[i].urlToImage;
        user.favoriteArticles.articleNewspaper[i] = data.articles[i].source.name;
       

    
        window.localStorage.setItem("user", JSON.stringify(user));



        // Her gemmes artiklerne i localstorage.
        localStorage.setItem(`favoritetitle${i}`, data.articles[i].title);
        localStorage.setItem(`favoriteimg${i}`, data.articles[i].urlToImage);
        localStorage.setItem(`favoritenewspaper${i}`, data.articles[i].source.name);
        localStorage.setItem(`favoriteurl${i}`, data.articles[i].url);



      } else { // Hvis man ikke er logget ind, og man klikker på det røde hjerte, får man at vide, at man skal være logget ind.
        alert("Du skal være logget ind for at kunne gemme nyheder")
      }
    });
  }

  // Følgende kode, er for at se, om man har læst nyheden.
  // Problemet med koden er, når der kommer nye nyheder eller hvis man søger på nyheder, vil der stadig stå, at den allerede er læst. 

  // Loop fra 0-7. Eventlistner på alle linknews. Hvis man er logget ind, gemmes der i localstorage at den er læst.
  // Siden reloades, og der sættes et p tag med "allerede læst" ind i div'en.
  for (let i = 0; i < 7; i++) {
    document.getElementById(`linknews${i}`).addEventListener("click", function () {
      if (localStorage.getItem('Success') === "true") {  // man skal være logget ind, før siden husker om man har læst nyheden. 

        localStorage.setItem(`news${i}read`, "true");

        window.location.reload();

      }


    });

    // Når siden bliver realoaded og man er logget ind bliver der tjekket om der er gemt noget i localstorage. Hvis der er gemt noget i localstorage
    // så sættes der en p tag med "allerede læst" ind i div'en.
    // ellers er den forsat tom. 

    if (localStorage.getItem(`news${i}read`) === "true" && localStorage.getItem('Success') === "true") {

      document.getElementById(`news${i}readcheck`).innerHTML += `<p id="read${i}" class="read">Allerede læst</p>`;
    }
    else {
      document.getElementById(`news${i}readcheck`).innerHTML = " ";
    }
  }

});







