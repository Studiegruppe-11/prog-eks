// login.js i mappen public 


document.getElementById("login").addEventListener("click", async function () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const result = await response.json();

    if (result.success) {
        window.location.href = "/index.html";
    } else {
        const errorMessage = result.error || "Forkert brugernavn eller adgangskode";
        alert(errorMessage);
    }
});





