window.addEventListener("DOMContentLoaded", async () => {

  async function getData() {
    let obj;

    let key = await fetch("key.json");
    key = await key.json();
    let apikey = (key.apikey);

    const res = await fetch(`http://localhost:3000/news`)

    obj = await res.json();

    return obj
  }

  getData();

  let data = await getData();



  let headnews = [];
  let imgnews = [];
  let newspaper = [];
  let urlnews = [];


  // Antallet af nyheder i vores database. (+1 fordi loopet starter på 0)
  let antalNyheder = (Object.keys(data).length) + 1;

  // kører fra antallet af nyheder - 7 og til antallet af nyheder. altså 7 gange. 
  for (let i = antalNyheder - 7; i < antalNyheder; i++) {

    headnews[i] = data[(i).toString()].title;
    newspaper[i] = headnews[i].substr(headnews[i].lastIndexOf("-")).trim();
    headnews[i] = headnews[i].substr(0, headnews[i].lastIndexOf("-")).trim();

    imgnews[i] = data[(i).toString()].imageUrl;
    urlnews[i] = data[(i).toString()].url;

    // i html er der lavet 7 divs med id'erne headnews0, headnews1 osv. derfor skal der minus hvilken værdi i har så den passer med id'et. 
    // og altså starter på 0.
    document.getElementById(`headnews${i - (antalNyheder - 7)}`).innerHTML = headnews[i];
    document.getElementById(`imgnews${i - (antalNyheder - 7)}`).innerHTML = '<img src="' + imgnews[i] + '">';
    document.getElementById(`newspaper${i - (antalNyheder - 7)}`).innerHTML = newspaper[i];
    document.getElementById(`linknews${i - (antalNyheder - 7)}`).innerHTML = '<a href="' + urlnews[i] + '">Læs mere</a>';


  }





  // Hvis man klikker på det røde hjerte, så gemmes nyheden i favoritter.

  for (let i = 0; i < 7; i++) {
    document.getElementById(`news${i}save`).addEventListener("click", async () => {
      const response = await fetch('/loggedIn');
      const result = await response.json();

      if (result.userId) {
        alert("Nyheden er gemt i favoritter");
        const savedNewsId = { news_id: data[(antalNyheder - 7 + i)].news_id };

        // lad os antage dataen længden er på 326. AntalNyheder er derfor 326 +1 = 327. 

        // Klikkes der på den store nyhed med id news0save vil den sige 327-7+0 = 320.

        // Send variablerne til serveren
        fetch("/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedNewsId),
        })
          .then((response) => {
            if (response.ok) {
              console.log(response.status);
            } else {
              console.log(response.status);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Du skal være logget ind for at kunne gemme nyheder")
      }
    });
  }



  // for (let i = 0; i < 7; i++) {
  //   document.getElementById(`linknews${i}`).addEventListener("click", async () => {
  //     const response = await fetch('/loggedIn');
  //     const result = await response.json();
  //     const response2 = await fetch('/readArticles');
  //     const result2 = await response2.json();

  //     if (result.userId) {
  //       const readArticles = { news_id: data[(antalNyheder - 7 + i)].news_id };
  //       // Send variablerne til serveren
  //       fetch("/readArticles", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(readArticles),
  //       })
  //         .then((response) => {
  //           if (response.ok) {
  //             console.log(response.status);
  //           } else {
  //             console.log(response.status);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //       window.location.reload();
  //     }

      // if (result.userId && readArticles.news_id === result2.news_id) {

      //   document.getElementById(`news${i}readcheck`).innerHTML += `<p id="read${i}" class="read">Allerede læst</p>`;
      // }
      // else {
      //   document.getElementById(`news${i}readcheck`).innerHTML = " ";
      // }

  // }






  for (let i = 0; i < 7; i++) {
    document.getElementById(`linknews${i}`).addEventListener("click", async () => {
      const response = await fetch('/loggedIn');
      const result = await response.json();
      window.location.reload();

      if (result.userId) {
        const readArticles = { news_id: data[(antalNyheder - 7 + i)].news_id };

        fetch("/readArticles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(readArticles),
        })
          .then((response) => {
            if (response.ok) {
              console.log(response.status);
            } else {
              console.log(response.status);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }








});