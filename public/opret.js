// opret.js i mappen public
document.getElementById("create").addEventListener("click", async function () {
  const name = document.getElementById("name").value;
  const favorite = document.getElementById("favorite").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const userData = {
    name: name,
    favorite: favorite,
    username: username,
    password: password
  };


 
  module.exports = { userData };



});














// document.getElementById("create").addEventListener("click", function () {

// });














// if (document.getElementById("name").value !== "" && document.getElementById("favorite").value !== ""
// && document.getElementById("username").value !== "" && document.getElementById("password").value !== "") {

// // Hvis alle felter er udfyldt, defineres følgende variabler:
// let name = document.getElementById("name").value;
// let favorite = document.getElementById("favorite").value;
// let username = document.getElementById("username").value;
// let password = document.getElementById("password").value;


// // Gemmer brugeroplysninger i localstorage
// const userprofile = {
//   nameuser: name,
//   favoriteuser: favorite,
//   usernameuser: username,
//   passworduser: password,
// };
// // Gemmer objektet i localstorage som en string med JSON.stringify.
// window.localStorage.setItem("userprofile", JSON.stringify(userprofile));

// document.getElementById("creatediv").innerHTML = "Bruger oprettet";

// document.getElementById("creatediv").innerHTML += `<div>

// <p>Gå til login

// <a href="login.html"> Klik her</a>

// </p>

// </div>`;

// }

// else {

// alert("Du skal udfylde alle felter");
// }


