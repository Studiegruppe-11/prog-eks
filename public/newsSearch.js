// newsSearch.js i mappe public.
const articleCardTemplate = document.querySelector("[data-article-template]");
const articleCardContainer = document.querySelector(".user-cards");
const searchInput = document.querySelector("#searchbar");
const modal = document.getElementById("myModal");
const closeButton = document.getElementById("closeButton");

let newsData = [];

articleCardContainer.style.display = "none";

// Luk modalen når lukkeknappen klikkes på
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Luk modalen når brugeren klikker et sted udenfor modalen
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Filtrer nyhedsdata ud fra søgeord og opdater artikelkort på siden
const filterAndUpdateArticles = (searchQuery) => {
  const filteredNews = newsData.filter((article) => {
    const title = article.title.toLowerCase();
    const author = article.author && article.author.toLowerCase();
    const description =
      article.description && article.description.toLowerCase();
    return (
      title.includes(searchQuery.toLowerCase()) ||
      (author && author.includes(searchQuery.toLowerCase())) ||
      (description && description.includes(searchQuery.toLowerCase()))
    );
  });

  // Ryd tidligere filtrerede artikler
  articleCardContainer.innerHTML = "";

  // Hvis ingen artikler matcher søgeordet, vises en besked i stedet for en artikels info
  if (filteredNews.length === 0) {
    const card = articleCardTemplate.content
      .cloneNode(true)
      .querySelector(".card");
    const header = card.querySelector("[data-header]");
    const body = card.querySelector("[data-body]");

    header.textContent = "No search results";
    body.textContent = "";

    // Fjern klikbarhed fra kortet og tilføj klassen "single-result"
    card.onclick = null;
    articleCardContainer.appendChild(card);
    articleCardContainer.classList.add("single-result");
  } else {
    // Opret et kort for hver filtreret artikel
    filteredNews.forEach((article) => {
      const card = articleCardTemplate.content
        .cloneNode(true)
        .querySelector(".card");
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");

      header.textContent = article.title;
      body.textContent = article.author;

      // Åben modalen og vis artiklens info, når brugeren klikker på kortet
      card.addEventListener("click", () => {
        const modalSrc = document.getElementById("modalSrc");
        const modalTitle = document.getElementById("modalTitle");
        const modalTxt = document.getElementById("modalTxt");
        const modalImg = document.getElementById("modalImg");
        modal.style.display = "block";
        modalTitle.innerHTML = article.title;
        modalTxt.innerHTML = article.description;
        modalImg.src = article.imageUrl;
        modalSrc.innerHTML = article.author;

        // Ryd søgefeltet og skjul kortcontaineren
        searchInput.value = "";
        articleCardContainer.style.display = "none";
      });

      articleCardContainer.appendChild(card);
    });
  }
};

// Opdater artiklerne, når brugeren skriver i søgefeltet. Hvis søgefeltet er tomt, skjules kortcontainere. Hvis søgefeltet ikke er tomt, vises kortcontaineren og artiklerne opdateres.
searchInput.addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  if (searchQuery === "") {
    articleCardContainer.style.display = "none";
  } else {
    articleCardContainer.style.display = "block";
    axios
      .get(`http://localhost:3000/search?query=${searchQuery}`)
      .then((response) => {
        newsData = Object.values(response.data);
        filterAndUpdateArticles(searchQuery);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
});
