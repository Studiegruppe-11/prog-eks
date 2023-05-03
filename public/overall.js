// overall.js i mappen public




// vis navn fra express session. 
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('/loggedIn');
    const result = await response.json();

    if (result.userId && result.name) {
      // Viser navn hvis man er logget ind
      document.getElementById("user").innerHTML = result.name;
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




// log ud og slet navn fra express-session
document.getElementById("logout").addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/logout', { method: 'POST' })
    .then(response => {
      if (response.ok) {
        window.location.href = '/index.html';
      } else {
        console.log('Der opstod en fejl under logout');
      }
    })
    .catch(error => console.log(error));
});

