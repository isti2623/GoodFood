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
                        <div onclick='loadMealDetail(${meal.idMeal})' class="btn btn-danger">Show Details</div>
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
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
    <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
    `;
    mealDetails.appendChild(div);
}