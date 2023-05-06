document.getElementById("skiftKnap").addEventListener("click", async function () {
    let password = document.getElementById("skiftKode").value;

    const response = await fetch('/users/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
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