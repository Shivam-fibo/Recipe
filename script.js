const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.search_btn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe_details_content');
const recipeCloseBtn = document.querySelector('.recipe_closeBtn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span></p>`;

        const button = document.createElement('button');
        button.innerHTML = "View Recipe";
        button.style.cursor= "pointer"
        

        button.addEventListener('click', () => {
            openRecipePopup(meal);
            console.log(meal)
        });

        recipeDiv.appendChild(button);
        recipeContainer.appendChild(recipeDiv);
    });
} catch (error) {
    recipeContainer.innerHTML = "<h2>No recipe found...</h2>";
}
}
// function to fetch ingredients and measurments
const fetchIngredients = (meal)=>{
//  console.log(meal);
let ingredientsList = ""
for(let i = 1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientsList+= `<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
 return ingredientsList;

}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class= "recipeName" >${meal.strMeal}</h2>
    <h3 >Ingredents: </h3>
    <ul class= "ingredientList"> ${fetchIngredients(meal)}</ul>

    <div class= "recipeInstructions">
        <h3>Instructions:  </h3>
            <p>${meal.strInstructions} </p>
       
    </div>
    `;
    
    
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box </h2>`
        return
    }
    fetchRecipes(searchInput);
});
