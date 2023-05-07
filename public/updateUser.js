// hvis der klikkes på skift adgangskode knappen, så skiftes adgangskoden.
document.getElementById("skiftKnap").addEventListener("click", async function () {
    let password = document.getElementById("skiftKode").value;

    // her bruges put, da der skal opdateres data i databasen.
    const response = await fetch('/users/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // gem password i body, så det kan bruges i controller.
        body: JSON.stringify({
            password: password
        })
    });

    const result = await response.json();

    if (result.success) {
        alert("Din kode er nu ændret");
        window.location.href = "/index.html";
    }
});