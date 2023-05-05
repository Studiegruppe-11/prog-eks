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

  // Opret et kort for hver filtreret artikel
  filteredNews.forEach((article) => {
    const card = articleCardTemplate.content
      .cloneNode(true)
      .querySelector(".card");
    const header = card.querySelector("[data-header]");
    const body = card.querySelector("[data-body]");

    header.textContent = article.title;
    body.textContent = article.author;

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

  // Tilføj klasse til containeren baseret på antallet af filtrerede artikler
  const numFilteredArticles = filteredNews.length;
  if (numFilteredArticles === 0) {
    articleCardContainer.classList.remove("single-result");
    articleCardContainer.classList.add("no-results");
  } else if (numFilteredArticles === 1) {
    articleCardContainer.classList.remove("no-results");
    articleCardContainer.classList.add("single-result");
  } else {
    articleCardContainer.classList.remove("no-results", "single-result");
  }
};

// Filtrer nyhedsdata og opdater artikelkort, når brugeren skriver i søgefeltet
searchInput.addEventListener("input", (event) => {
  articleCardContainer.style.display = "block";
  const searchQuery = event.target.value;
  filterAndUpdateArticles(searchQuery);
  if (searchQuery === "") {
    articleCardContainer.style.display = "none";
  }
});

// Hent nyhedsdata fra serveren og opdater artikelkort
fetch("http://localhost:3000/news")
  .then((response) => response.json())
  .then((data) => {
    newsData = Object.values(data);
    filterAndUpdateArticles("");
  });
