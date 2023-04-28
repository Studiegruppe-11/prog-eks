window.addEventListener("DOMContentLoaded", async () => {
  async function getData() {
    let obj;

    let key = await fetch("key.json");
    key = await key.json();

    const res = await fetch(`http://localhost:3000/historiskVejrData`); // api-key er gemt i en json fil, så den er skjult.
    // kun US nyheder.

    obj = await res.json();

    return obj;
  }

  getData();

  let data = await getData();

  let date = [];
  let temp = [];

  for (let index = 1; index < data.length; index++) {
    console.log(data[index].date);
  }

  document.getElementById("date1").innerHTML = date;
  document.getElementById("date1").innerHTML = date;
});

console.log("hej"); // til at tjekke om js filen er linked til index.html
