document.addEventListener("DOMContentLoaded", function () {


  const articleCardTemplate = document.querySelector("[data-article-template]");
  const articleCardContainer = document.querySelector(
    "[data-article-cards-container]"
  );
  const searchInput = document.querySelector("[data-search]");
  articleCardContainer.style.display = "none";
  let articles = [];

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    articles.forEach((article) => {
      const isVisible =
        article.title.toLowerCase().includes(value) ||
        article.source.toLowerCase().includes(value);
      article.element.classList.toggle("hide", !isVisible);
    });
  });

  // Eventlistener til søgefeltet
  searchInput.addEventListener("keyup", () => {
    articleCardContainer.style.display =
      searchInput.value === "" ? "none" : "block";
    for (let i = 0; i < articleCardContainer.children.length; i++) {
      const card = articleCardContainer.children[i];
      card.addEventListener("click", () => {
        const modal = document.getElementById("myModal");
        const modalSrc = document.getElementById("modalSrc");
        const modalTitle = document.getElementById("modalTitle");
        const modalTxt = document.getElementById("modalTxt");
        const modalImg = document.getElementById("modalImg");
        modal.style.display = "block";
        modalTitle.innerHTML = card.querySelector("[data-header]").textContent;
        modalTxt.innerHTML = "Text 1";
        modalImg.src = "https://via.placeholder.com/150";
        modalSrc.innerHTML = card.querySelector("[data-body]").textContent;
        searchInput.value = "";
        articleCardContainer.style.display = "none";
      });
    }
  });

  // Fetcher og erstatter
  fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=23eb4787514a45c0a8c05c73dedaac2f"
  )
    .then((response) => response.json())
    .then((data) => {
      articles = data.articles.map((article) => {
        const card = articleCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        header.textContent = article.title;
        body.textContent = article.source.name;
        articleCardContainer.append(card);
        return {
          title: article.title,
          source: article.source.name,
          description: article.description,
          Image: article.urlToImage,
          element: card,
        };
      });
    });
});