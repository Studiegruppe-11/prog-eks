// public/opret.js

// hvis alle felter er udfyldt gemmes brugeroplysninger i variable.
// derefter fetches de til enpoint /users/create så de kan bruges i users.route.js
// derefter sendes brugeren til login.html
document.getElementById("create").addEventListener("click", function () {
  if (
    document.getElementById("name").value !== "" &&
    document.getElementById("favorite").value !== "" &&
    document.getElementById("username").value !== "" &&
    document.getElementById("password").value !== ""
  ) {
    let name = document.getElementById("name").value;
    let favorite = document.getElementById("favorite").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Send variablerne til serveren
    fetch("/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        favorite: favorite,
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.status);
          window.location.href = "/login.html";
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Du skal udfylde alle felter");
  }
});
