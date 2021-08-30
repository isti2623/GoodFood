const searchFood = () => {
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value;
    inputField.value = '';

    if (inputText == '') {
        const block = document.getElementById("bloc");
        block.style.display = 'block';
    }
    else {
        const block = document.getElementById("bloc");
        block.style.display = 'none';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`

        fetch(url)
            .then(res => res.json())
            .then(data => showMeals(data.meals))
    }



}

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
                        <h5 style='color:rgb(13, 182, 224)' class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                        <div class="btn btn-danger">Show Details</div>
                    </div>
                </div>
            `
            searchResult.appendChild(div);
        }
        )
    }

}