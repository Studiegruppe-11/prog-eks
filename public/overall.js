// overall.js i mappen public



// hvis en bruger er logget ind så har jeg i users.route.js lavet et endpoint der gemmer brugers navn i http://localhost:3000/loggedInUser.
// når index.html loades tjekkes der om http://localhost:3000/loggedInUser indeholder en en bruger. 
// hvis der er en bruger så vises brugerens navn i navbaren. og login og opret osv fjernes og i stedet kan man nu se en logud knap og en manage knap.


// VIRKER. men hvis man nodemon app.js kører igen så virker det ikke. dvs det vil virke når vi afleverer, da vi kun kører app.js og ikke sidder og ændrer i filen og derved ikke kører nodemon app.js

window.addEventListener("DOMContentLoaded", async () => {
    // try catch bruges så siden ikke crasher hvis der er en fejl. 
    // og så gør det også at man kan reloaded index.html, da da den ikke kan nå at tjekke i databasen om der findes en bruger i localhost:3000/loggedInUser. før siden er loaded.
    try {
        const res = await fetch('http://localhost:3000/loggedInUser');
        const data = await res.json();

        if (Object.keys(data).length > 0) {
            // Viser navn hvis man er logget ind
            document.getElementById("user").innerHTML = data["1"].name;
            // Skal ikke vise "opret bruger" hvis man er logget ind.
            document.getElementById("createuser").innerHTML = "";
            // Skal ikke vise "login" hvis man er logget ind.
            document.getElementById("login").innerHTML = "";
            // Skal kun vise symbol, hvis man er logget ind.
            document.getElementById("manageuser").innerHTML = `<a href="manage.html" class="fa fa-user" style="font-size:30px"></a>`;
            // Skal kun vise logout, hvis man er logget ind
            document.getElementById("logout").innerHTML = `<a href="index.html" class="fa fa-sign-out" id="logout"></a>`;
        }
    } catch (error) {
        console.log(error);
        // Håndter fejlhåndtering her
    }
});




// HERNEDE SKAL LOGUD KODE VÆRE. 
const logoutBtn = document.getElementById('logout');

// Lyt på klikhændelsen på logout-knappen
logoutBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Forhindrer standardadfærd (dvs. at navigere til href-attributten)

  // Udfør en HTTP DELETE-anmodning til '/loggedInUser'
  fetch('/loggedInUser', { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        // Hvis sletningen var vellykket, omdiriger til index.html
        window.location.href = '/index.html';
      } else {
        console.log('Der opstod en fejl under sletning af loggedInUser');
      }
    })
    .catch(error => console.log(error));
});
 