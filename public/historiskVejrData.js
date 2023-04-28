window.addEventListener("DOMContentLoaded", async () => {

    async function getData() {
      let obj;
  
      let key = await fetch("key.json");
      key = await key.json();
      
  
      const res = await fetch(`http://localhost:3000/historiskVejrData`) // api-key er gemt i en json fil, så den er skjult. 
      // kun US nyheder. 
  
      obj = await res.json();
  
      return obj
    }
  
    getData();
  
    let data = await getData();

    let date = [];
    let temp = [];

    console.log(data);



    for (let i = 0; i < 30; i++) {

        date[i] = data[i].date;
        temp[i] = data[i].temp;
    
        document.getElementById(`date${i}`).innerHTML = date[i];
        document.getElementById(`temp${i}`).innerHTML = temp[i];

    }


  
  
});