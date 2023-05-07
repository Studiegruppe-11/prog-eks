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


// følgende kode viser vejrudsigten for de næste 7 dage.
window.addEventListener("DOMContentLoaded", async () => {

    async function getData() {
        let obj;

        // hent data fra vores eget API.
        const res = await fetch('http://localhost:3000/weatherForecast')

        obj = await res.json();

        return obj
    }

    getData();

    let data = await getData();

    
    // indsæt dagens temperatur i html. 
    let temp = data[1].temperature;
    document.getElementById("temp").innerHTML = temp + "°";


    // indsæt solopgang og solnedgang i html.
    const sunriseDate = new Date(data[1].sunrise);
    document.getElementById("sunrise").innerHTML = sunriseDate.toLocaleTimeString('da-DK', {hour: '2-digit', minute:'2-digit'});    

    const sunsetDate = new Date(data[1].sunset);
    document.getElementById("sunset").innerHTML = sunsetDate.toLocaleTimeString('da-DK', {hour: '2-digit', minute:'2-digit'});    

    


    for (let i = 1; i < 8; i++) {

        // indsæt temperaturer i vejrudsigten. 
        document.getElementById("day" + (i)).innerHTML = data[i].temperature + "°"
    
        // indsæt icon i vejrudsigten

        let code = data[i].weathercode; 

        if (code === 0) {  // Hvis koden er mindre end 3 så er det sol.

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:day-sunny" class="weathertypeicon"></iconify-icon> `;  // sun
        }
        if (code > 0.1 && code <= 3) { // Hvis koden er mindre end 3 så er det overskyet. // Sådan forstsætter det for alle de andre.

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:day-cloudy" class="weathertypeicon"></iconify-icon>`; //cloudy
        }
        if (code > 43 && code <= 48) {

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:fog" class="weathertypeicon"></iconify-icon>`; // fog
        }
        if (code > 50 && code <= 57) {

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:rain-mix" class="weathertypeicon"></iconify-icon`;     //drizzle rain
        }
        if (code > 60 && code <= 67) {

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:rain" class="weathertypeicon"></iconify-icon>`;    //rain
        }
        if (code > 70 && code <= 77) {

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:snow" class="weathertypeicon"></iconify-icon>`; //snow
        }
        if (code > 79 && code <= 82) {

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:showers" class="weathertypeicon"></iconify-icon>`; //rain showers
        }
        if (code > 84 && code <= 86) {

            document.getElementById("code" + (i)).innerHTML = `<iconify-icon icon="wi:snow" class="weathertypeicon"></iconify-icon>`; // snow showers.  
        }
    }

    document.getElementById("tempicon").innerHTML = document.getElementById("code1").innerHTML; // Her sættes ikonet for dagens vejr til at være det samme som den første dag i vejrudsigten, som er jo i dag.

});



// Følgende kode, sætter ugedagen ind i html'en i vejrudsigten.
const weekday = ["SØN", "MAN", "TIR", "ONS", "TOR", "FRE", "LØR"];

for (let i = 0; i < 7; i++) {
    document.getElementById("weekday" + i).innerHTML = weekday[(new Date().getDay() + i) % 7];
}
 




