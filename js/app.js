const spinner = document.getElementById("spinner");
const searchFood = () => {
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value;
    inputField.value = '';
    spinner.style.display = 'block';
    // if (inputText == '') {
    //     const block = document.getElementById("bloc");
    //     block.style.display = 'block';
    // }

    // const block = document.getElementById("bloc");
    // block.style.display = 'none';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`

    fetch(url)
        .then(res => res.json())
        .then(data => showFood(data.meals))

    spinner.style.display = 'none';


}
searchFood();


const showFood = food => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = '';
    if (food == null) {
        const block = document.getElementById("block");
        block.style.display = 'block';
    }
    else {
        food.forEach(meal => {
            // console.log(meal);
            const block = document.getElementById("block");
            block.style.display = 'none';

            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
            <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 style='color:#dc3545' class="card-title fw-bold">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                        <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-danger">
                        Show Details
                    </button>
                    </div>
                </div>
            `
            searchResult.appendChild(div);
        }
        )
    }


}

// Show More Details
const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {

    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
    <p class="card-text"><small target="_blank" class="text-muted">${meal.strYoutube}</small></p>
</div>
<img src="${meal.strMealThumb}"  class="img-fluid card-img-bottom" alt="...">
    `;
    mealDetails.appendChild(div);
}