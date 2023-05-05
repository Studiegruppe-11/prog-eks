// const articleCardTemplate = document.querySelector("[data-article-template]");
// const articleCardContainer = document.querySelector(".user-cards");
// const searchInput = document.querySelector("#searchbar");
// const modal = document.getElementById("myModal"); // Replace 'myModal' with the ID or class of your modal
// const closeButton = document.getElementById("closeButton"); // Assuming the close button has a class 'close'

// articleCardContainer.style.display = "none";

// let articles = [];

// // Close the modal when the close button is clicked
// closeButton.addEventListener("click", () => {
//   modal.style.display = "none";
// });

// // Close the modal when the user clicks anywhere outside of it
// modal.addEventListener("click", (event) => {
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// });

// articleCardContainer.querySelectorAll(".article-card").forEach((card) => {
//   card.classList.add("hide");
// });

// // Filter articles based on search input
// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   const filteredArticles = articles.filter((article) => {
//     return (
//       article.title.toLowerCase().includes(value) ||
//       article.source.toLowerCase().includes(value)
//     );
//   });
//   articleCardContainer.style.display =
//     filteredArticles.length === 0 ? "none" : "block";

//   // Clear previously filtered articles
//   articleCardContainer.querySelectorAll(".article-card").forEach((card) => {
//     card.classList.add("hide");
//   });

//   articleCardContainer.innerHTML = ""; // Clear the container

//   filteredArticles.forEach((article) => {
//     article.element.classList.remove("hide");
//     articleCardContainer.append(article.element);
//   });

//   // console.log("filteredArticles: ", filteredArticles);
// });

// searchInput.addEventListener("keyup", () => {
//   articleCardContainer.style.display =
//     searchInput.value === "" ? "none" : "block";
//   for (let i = 0; i < articleCardContainer.children.length; i++) {
//     const card = articleCardContainer.children[i];
//     const article = articles[i];
//     card.addEventListener("click", () => {
//       const modal = document.getElementById("myModal");
//       const modalSrc = document.getElementById("modalSrc");
//       const modalTitle = document.getElementById("modalTitle");
//       const modalTxt = document.getElementById("modalTxt");
//       const modalImg = document.getElementById("modalImg");
//       modal.style.display = "block";
//       modalTitle.innerHTML = article.title;
//       modalTxt.innerHTML = article.description;
//       modalImg.src = article.Image;
//       modalSrc.innerHTML = article.source;
//       searchInput.value = "";
//       articleCardContainer.style.display = "none";
//     });
//   }
// });

// fetch(
//   "https://newsapi.org/v2/top-headlines?country=us&apiKey=e3694cebee5640f0b058c83adedf7fa2"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     articles = data.articles.map((article) => {
//       const card = articleCardTemplate.content.cloneNode(true).children[0];
//       const header = card.querySelector("[data-header]");
//       const body = card.querySelector("[data-body]");
//       header.textContent = article.title;
//       body.textContent = article.source.name;
//       articleCardContainer.append(card);
//       return {
//         title: article.title,
//         source: article.source.name,
//         description: article.description,
//         Image: article.urlToImage,
//         element: card,
//       };
//     });
//   });
