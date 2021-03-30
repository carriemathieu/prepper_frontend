categories_url = "http://localhost:3000/api/categories"
words_url = "http://localhost:3000/api/words"

document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded")
    const createWordListForm = document.querySelector("#create-word-list-form")

    // on click
    createWordListForm.addEventListener('submit', function(e) {
        e.preventDefault();
        createFormHandler(e)
    })
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

            document.querySelector('#category-container').insertAdjacentHTML("beforeend", categoryMarkup) 
        })
    }
    )
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const wordListInput = getWords()
    const categoryInput = document.querySelector("#categories").value
    const categoryId = parseInt(categoryInput)
    postFetch(titleInput, wordListInput, categoryId)
}

function getWords() {
    let words = document.querySelectorAll("#input-word")
    let wordsinput = []
    for (let i = 0; i < words.length; i++) {
        wordsinput.push(words[i].value) 
    }
    return wordsinput 
}

function postFetch(title, word_list, category_id) {
    fetch(words_url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            word_list: word_list,
            category_id: category_id
        })
    })
    .then(resp => resp.json())
    .then(category => {
        console.log(category)
    })
}