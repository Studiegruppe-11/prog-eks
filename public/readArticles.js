
window.addEventListener("DOMContentLoaded", async () => {
    // hvis brugeren er logget ind
        const response = await fetch('/loggedIn');
        const result = await response.json();
    
        if (result.userId) {
        try {
            const response = await fetch("http://localhost:3000/readArticles");
            const favorites = await response.json();

            // Loop gennem alle favoritartikler og opret et HTML-element for hver
            const favoritesContainer = document.getElementById("read-container");
            for (const [id, favorite] of Object.entries(favorites)) {
                const articleElement = document.createElement("article");

                const titleElement = document.createElement("h2");
                titleElement.innerText = favorite.title;
                articleElement.appendChild(titleElement);
 
                const authorElement = document.createElement("p");
                authorElement.innerText = "By " + favorite.author;
                articleElement.appendChild(authorElement);
                
                const imageElement = document.createElement("img");
                imageElement.src = favorite.imageUrl;
                articleElement.appendChild(imageElement);

                const linkElement = document.createElement("a");
                linkElement.href = favorite.url;
                linkElement.innerText = "Læs artikel";
                articleElement.appendChild(linkElement);

                favoritesContainer.appendChild(articleElement);
            }
        } catch (error) {
            console.log(error);
            // Håndter fejlhåndtering her
        }
    } else {
        // Hvis brugeren ikke er logget ind, så vis en besked om at logge ind
        const favoritesContainer = document.getElementById("read-container");
        const messageElement = document.createElement("p");
        messageElement.innerText = "Du skal være logget ind for at se dine læste artikler";
        favoritesContainer.appendChild(messageElement);
    }
});
