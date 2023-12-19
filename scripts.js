// Function to fetch random food data from MealDB API
async function fetchRandomFoodData() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
  
    const meal = data.meals[0];
    const imgUrl = meal.strMealThumb;
    const recipeTitle = meal.strMeal;
    const recipeInstructions = meal.strInstructions;
  
    document.getElementById('food-photo').src = imgUrl;
    document.getElementById('recipe-title').innerText = recipeTitle;
    document.getElementById('recipe-text').innerText = recipeInstructions;
  }
  
  // Function to search for a specific food item
  async function searchFood() {
    const searchTerm = document.getElementById('food-search').value;
    const resultsContainer = document.getElementById('search-results-container');
  
    if (!searchTerm) {
      resultsContainer.innerHTML = '';
      return;
    }
  
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();
  
    resultsContainer.innerHTML = '';
  
    if (data.meals) {
      data.meals.forEach(meal => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result');
  
        const resultImage = document.createElement('img');
        resultImage.src = meal.strMealThumb;
        resultImage.alt = meal.strMeal;
        resultImage.onclick = function () {
          displayFoodDetails(meal);
        };
  
        resultItem.appendChild(resultImage);
  
        const resultText = document.createElement('div');
        resultText.classList.add('search-result-text');
        resultText.innerHTML = `<span>${meal.strMeal}</span>`;
        resultItem.appendChild(resultText);
  
        resultsContainer.appendChild(resultItem);
      });
    } else {
      resultsContainer.innerHTML = '<div>No results found</div>';
    }
  }
  
  // Function to display details for a specific food item
  async function displayFoodDetails(meal) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
    const data = await response.json();
  
    const detailedMeal = data.meals[0];
    const imgUrl = detailedMeal.strMealThumb;
    const recipeTitle = detailedMeal.strMeal;
    const recipeInstructions = detailedMeal.strInstructions;
  
    document.getElementById('food-photo').src = imgUrl;
    document.getElementById('recipe-title').innerText = recipeTitle;
    document.getElementById('recipe-text').innerText = recipeInstructions;
  
    document.getElementById('search-results-container').innerHTML = '';
  }
  
  document.getElementById('food-photo').addEventListener('click', function () {
    fetchRandomFoodData();
  });
  
  fetchRandomFoodData();
  