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

  console.log(data[1].date);

  for (let i = 1; i < data.length; i++) {
    console.log(data[i].date);
  }

  document.getElementById("date1").innerHTML = date;
  document.getElementById("date1").innerHTML = date;
});
