//Følgende kode viser den nuværende tid og opdaterer hvert 500ms
// taget fra https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 1000);
}
startTime();


// følgende kode viser nuværende dato
// taget fra https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
const currentDate = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

document.getElementById("date").innerHTML = currentDate.toLocaleDateString("da-DA", options);

window.addEventListener("DOMContentLoaded", async () => {

    async function getData() {
        let obj;

        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&hourly=temperature_2m')
        // taget fra https://open-meteo.com/en/docs#api_form, hvor jeg har langt hourly temperature. 

        obj = await res.json();

        return obj
    }

    getData();

    let data = await getData();

    // Tager her temperaturen. 
    let temp = data.hourly.temperature_2m[12];

    document.getElementById("temp").innerHTML = temp + "°";
});


// For solopgang og solnedgang

window.addEventListener("DOMContentLoaded", async () => {

    async function getData() {
        let obj;

        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&timezone=auto&daily=sunset')

        // taget fra https://open-meteo.com/en/docs#api_form.  hvor jeg har valgt tidszone og solnedgang.



        obj = await res.json();

        return obj
    }

    getData();

    let data = await getData();


    const sunset = data.daily.sunset[0]; // Her sætter jeg en const til at være datoen og solnedgang. Jeg skal kun bruge tidspunktet og ikke dato



    let sunsettime = sunset[11] + sunset[12] + sunset[13] + sunset[14] + sunset[15]; //Hher sætter jeg en variabel til at være de 5 sidste tal i arrayet.


    document.getElementById("sunset").innerHTML = sunsettime; // Og her sætter jeg det ind i html'en. Kun tidspunktet sættes ind og ikke dato. 

});



window.addEventListener("DOMContentLoaded", async () => {

    async function getData() {
        let obj;

        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&timezone=auto&daily=sunrise')

        // Taget fra https://open-meteo.com/en/docs#api_form ,hvor jeg har valgt tidszone og solopgang.



        obj = await res.json();

        return obj
    }


    getData();

    let data = await getData();


    const sunrise = data.daily.sunrise[0]; // Her sætter jeg en const til at være datoen og solnedgang. jeg skal kun bruge dato



    let sunrisetime = sunrise[11] + sunrise[12] + sunrise[13] + sunrise[14] + sunrise[15]; // Her sætter jeg en variabel til at være de 5 sidste tal i arrayet.


    document.getElementById("sunrise").innerHTML = sunrisetime; // og her sætter jeg det ind i html'en. Kun tidspunktet og ikke datoen. 

});


// Vejrudsigt de næste 7 dage
window.addEventListener("DOMContentLoaded", async () => {

    async function getData() {
        let obj;

        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&timezone=auto&daily=temperature_2m_max')

        // Taget fra https://open-meteo.com/en/docs#api_form  hvor jeg har valgt daily og temperature_2m_max.
        // Man kan enten vælge max temperaturen eller minimum temperaturen. Jeg har valgt max.

        obj = await res.json();

        return obj
    }

    getData();

    let data = await getData();

    // koden tager day1, day2 osv, og erstatter det med temperaturen fra arrayet.

    for (let i = 0; i < 7; i++) {

        document.getElementById("day" + (i + 1)).innerHTML = data.daily.temperature_2m_max[i] + "°";
    }
});

// Følgende kode henter en vejrkode fra vejr api'et. 
window.addEventListener("DOMContentLoaded", async () => {

    async function getData() {
        let obj;
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&timezone=auto&daily=weathercode')
        // Taget fra https://open-meteo.com/en/docs#api_form.  hvor jeg har valgt weathercode under daily og auto timezone.
        obj = await res.json();
        return obj
    }
    getData();

    let data = await getData();

    for (let i = 0; i < 7; i++) {  //Et loop der kører fra 0 til 7, da der er 7 dage i udsigten med vejrkoder.

        let code = data.daily.weathercode[i]; // Her sætter jeg en variabel til at være vejrkoden for hver dag

        // Nu er vejrkoderne for det enkelte dage gemt i variablen code.

        // Følgende kode sætter et ikon ind i html'en, alt efter hvad vejrkoden er.

        // Ikoner er herfra https://icon-sets.iconify.design/wi/snow/

        // Definationerne af vejrkoderne er herfra https://open-meteo.com/en/docs#api_weathercode

        // I mit html har jeg lavet en div med id code1, code2 osv. Dette har jeg gjort så jeg kan sætte et ikon ind i hver af dem.

        if (code === 0) {  // Hvis koden er mindre end 3 så er det sol.

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:day-sunny" class="weathertypeicon"></iconify-icon> `;  // sun
        }
        if (code > 0.1 && code <= 3) { // Hvis koden er mindre end 3 så er det overskyet. // Sådan forstsætter det for alle de andre.

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:day-cloudy" class="weathertypeicon"></iconify-icon>`; //cloudy
        }
        if (code > 43 && code <= 48) {

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:fog" class="weathertypeicon"></iconify-icon>`; // fog
        }
        if (code > 50 && code <= 57) {

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:rain-mix" class="weathertypeicon"></iconify-icon`;     //drizzle rain
        }
        if (code > 60 && code <= 67) {

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:rain" class="weathertypeicon"></iconify-icon>`;    //rain
        }
        if (code > 70 && code <= 77) {

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:snow" class="weathertypeicon"></iconify-icon>`; //snow
        }
        if (code > 79 && code <= 82) {

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:showers" class="weathertypeicon"></iconify-icon>`; //rain showers
        }
        if (code > 84 && code <= 86) {

            document.getElementById("code" + (i + 1)).innerHTML = `<iconify-icon icon="wi:snow" class="weathertypeicon"></iconify-icon>`; // snow showers.  
        }
    }
    document.getElementById("tempicon").innerHTML = document.getElementById("code1").innerHTML; // Her sættes ikonet for dagens vejr til at være det samme som den første dag i vejrudsigten, som er jo i dag.

});

// Følgende kode, sætter ugedagen ind i html'en i vejrudsigten.



// Bedre kode
const weekday = ["SØN", "MAN", "TIR", "ONS", "TOR", "FRE", "LØR"];

for (let i = 0; i < 7; i++) {
    document.getElementById("weekday" + i).innerHTML = weekday[(new Date().getDay() + i) % 7];
}
 









// let a = new Date();
// let weekday = new Array();
// weekday[0] = "SØN";
// weekday[1] = "MAN";
// weekday[2] = "TIR";
// weekday[3] = "ONS";
// weekday[4] = "TOR";
// weekday[5] = "FRE";
// weekday[6] = "LØR";
// weekday[7] = "SØN";
// weekday[8] = "MAN";
// weekday[9] = "TIR";
// weekday[10] = "ONS";
// weekday[11] = "TOR";
// weekday[12] = "FRE";
// weekday[13] = "LØR";

// // Alle ugedage står skrevet 2 gange da den indbyggede kommando .getday() returerer en værdi fra 0-6. 
// // 0 er søndag, 1 er mandag osv. Jeg har så sat 7-13 til at være de samme som 0-6, da i jo kører fra 0-6, 
// // F.esk om mandagen vil den 7. da så være getday() (som giver 1) + 6 = 7, og denne dage findes jo ikke hvis jeg 
// // ikke har sat alle dagene 2 gange. 

// for (let i = 0; i < 7; i++) {

//     document.getElementById("weekday" + i).innerHTML = weekday[a.getDay() + i];
// }