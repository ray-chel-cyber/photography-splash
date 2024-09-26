

function fetchCocktail(cocktailName) {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCocktails(data.drinks);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            cocktailDisplay.innerHTML = "<p>Sorry, no cocktails found.</p>";
        });
}

// Function to display cocktails on the page
function displayCocktails(cocktails) {
    cocktailDisplay.innerHTML = ''; // Clear previous results

    if (cocktails === null) {
        cocktailDisplay.innerHTML = "<p>No cocktails found. Try searching for another one.</p>";
        return;
    }

    cocktails.forEach(cocktail => {
        const cocktailCard = document.createElement('div');
        cocktailCard.classList.add('cocktail-card');

        cocktailCard.innerHTML = `
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            <h3>${cocktail.strDrink}</h3>
            <p><strong>Category:</strong> ${cocktail.strCategory}</p>
            <p><strong>Alcoholic:</strong> ${cocktail.strAlcoholic}</p>
            <p><strong>Instructions:</strong> ${cocktail.strInstructions}</p>
        `;

        cocktailDisplay.appendChild(cocktailCard);
    });
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const cocktailName = searchInput.value.trim();
    if (cocktailName) {
        fetchCocktail(cocktailName);
    } else {
        cocktailDisplay.innerHTML = "<p>Please enter a cocktail name.</p>";
    }
});

// Fetch default cocktail on page load (Margarita)
window.onload = () => {
    fetchCocktail('margarita');
};
