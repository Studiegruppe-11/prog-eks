let credentials = {};

document.getElementById("login").addEventListener("click", async function () {

    async function getData() {
        let obj;
        const res = await fetch('http://localhost:3000/users')
        obj = await res.json();
        return obj;
    }

    let data = await getData();


});


    // if (data.usernameuser === document.getElementById("username").value && userProfile.passworduser === document.getElementById("password").value) {

    //     localStorage.setItem('Success', 'true');

    //     document.getElementById("logindiv").innerHTML = `<div>
    //     <p>Velkommen ${userProfile.nameuser}: Gå til hjemmeside </p>
    //     <a href="index.html"> Klik her</a>        
    //     </div>`;
    // }

    // else if (userProfile.usernameuser !== document.getElementById("username").value || userProfile.passworduser !== document.getElementById("password").value) {

    //     document.getElementById("username").value = "";
    //     document.getElementById("password").value = "";
    //     document.getElementById("wrong").innerHTML = "Forkert brugernavn eller adgangskode";
    //     localStorage.setItem('Success', 'false');
    // }






