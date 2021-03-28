categories_url = "http://localhost:3000/api/categories"

document.addEventListener('DOMContentLoaded', () => {
    getCategories()
})

function getCategories() {
    fetch(categories_url)
    .then(resp => resp.json())
    .then(categories => {
        categories.data.forEach( category => {
            const categoryMarkup = 
            `<div data-id=${category.id}>
            <h3> ${category.attributes.name} </h3>`

            document.querySelector('#category-container').innerHTML += categoryMarkup
        }
        )
        
    }
    )
}