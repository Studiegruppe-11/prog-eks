window.addEventListener("DOMContentLoaded", async () => {

    // json.parse = læser data fra localstorage og laver det om til et objekt.
    let obj = JSON.parse(window.localStorage.getItem("userprofile"));

    if (localStorage.Success === "true") {
        document.getElementById("user").innerHTML = obj.nameuser;       // Viser navn hvis man er logget ind
        document.getElementById("createuser").innerHTML = "";   // Skal ikke vise  "opret bruger" hvis man er logget ind. 
        document.getElementById("login").innerHTML = "";   // Skal ikke vise "login" hvis man er logget ind. 
        document.getElementById("manageuser").innerHTML = `<a href="manage.html" class="fa fa-user" style="font-size:30px"></a>` // Skal kun vise symbol, hvis man er logget ind.
        document.getElementById("logout").innerHTML = `<a href="index.html" class="fa fa-sign-out" id="logout"></a>`; // Skal kun vise logout, hvis man er logget ind.
    }
    else if (localStorage.Success === "false") {
        document.getElementById("user").innerHTML = "";   // Skal kun vise, navn hvis man er logget ind
        document.getElementById("manageuser").innerHTML = " ";   // Skal ikke kunne "manage user" hvis man ikke er logget ind. 
    }
});

// Hvis der klikkes logud, skal localstorage sættes til false. 
document.getElementById("logout").addEventListener("click", function () {

    localStorage.setItem('Success', 'false');
    window.location.href = "index.html";
});



// document.getElementById("searchbar").addEventListener("keypress", async (e) => {

//     let key = await fetch("key.json");
//     key = await key.json();
//     let apikey = (key.apikey);

//     if (e.key === 'Enter') {

//         let search = document.getElementById("searchbar").value;

//         let link = `https://newsapi.org/v2/everything?q=${search}   &language=en&apiKey=${apikey}`;
//         // Nyhederne er på engelsk. 

//         //Jeg sætter Linket til at være det der står i søgefeltet, ved brug af ${search}. Search er en varibel defineret ovenover, der tager 
//         // værdien af det, der skrives i søgefeltet.  

//         // Koden under, er det samme som i scriptnews.js, når jeg henter nyhederne.

//         async function getData() {
//             let obj;

//             const res = await fetch(link);
//             obj = await res.json();

//             return obj
//         }

//         getData();

//         let data = await getData();

//         for (let i = 0; i < 7; i++) {
//             let headnews = [];
//             let imgnews = [];
//             let newspaper = [];
//             let urlnews = [];

//             headnews[i] = data.articles[i].title;
//             imgnews[i] = data.articles[i].urlToImage;
//             newspaper[i] = data.articles[i].source.name;
//             urlnews[i] = data.articles[i].url;

//             document.getElementById(`headnews${i}`).innerHTML = headnews[i];
//             document.getElementById(`imgnews${i}`).innerHTML = `<img src="${imgnews[i]}" alt="article picture">`;
//             document.getElementById(`linknews${i}`).innerHTML = `<a href="${urlnews[i]}" target="_blank">Read more</a>`;
//             document.getElementById(`newspaper${i}`).innerHTML = newspaper[i];
//         }
//     }
// });
