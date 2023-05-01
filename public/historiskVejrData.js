window.addEventListener("DOMContentLoaded", async () => {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("p");
    p.id = `vejrData${i}`;
    document.body.appendChild(p);
  }

  // fetcher data fra DB
  async function getData() {
    let obj;

    let key = await fetch("key.json");
    key = await key.json();

    const res = await fetch(`http://localhost:3000/historiskVejrData`);

    obj = await res.json();

    return obj;
  }

  getData();

  let data = await getData();

  // indsætter temperaturne, dato og vejriconer i DOM
  for (let i = 1; i < 30; i++) {
    let key = i.toString();
    document.getElementById(`vejrData${i}`).innerHTML =
      data[key].temp + "°" + " " + data[key].date + " " + data[key].icon;
    checkLastWord(i);
  }
});

// trimmer icon fra db og indsætter icon.
function checkLastWord(i) {
  var element = document.getElementById(`vejrData${i}`);
  var text = element.textContent.trim();
  var words = text.split(" ");
  var lastWord = words[words.length - 1];
  var newIcon = "";

  if (lastWord == "rain") {
    newIcon =
      '<iconify-icon icon="wi:rain" class="weathertypeicon"></iconify-icon>';
  } else if (lastWord == "clear-day") {
    newIcon =
      '<iconify-icon icon="ph:sun-duotone" class="weathertypeicon"></iconify-icon>';
  } else if (lastWord == "partly-cloudy-day") {
    newIcon =
      '<iconify-icon icon="ph:cloud-sun-duotone" class="weathertypeicon"></iconify-icon>';
  } else if (lastWord == "cloudy") {
    newIcon = '<iconify-icon icon="ic:twotone-wb-cloudy"></iconify-icon>';
  }

  if (newIcon != "") {
    words[words.length - 1] = newIcon;
    var newText = words.join(" ");
    var lastSpaceIndex = text.lastIndexOf(" ");
    var oldLastWord = text.slice(lastSpaceIndex);
    var newLastWord = newText.slice(lastSpaceIndex);
    element.innerHTML = text.replace(oldLastWord, newLastWord);
  }
}
