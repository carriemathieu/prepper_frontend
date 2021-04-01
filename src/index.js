categories_url = "http://localhost:3000/api/categories"
words_url = "http://localhost:3000/api/words"

document.addEventListener('DOMContentLoaded', () => {
    const createWordListForm = document.querySelector("#create-word-list-form")
    const ready = document.querySelector("#ready")
    const newListButton = document.querySelector("#createList")
    const catContainer = document.querySelector("#category-container")
    const catDropDown = document.querySelector("categories")

    // gets info from backend db
    getCategories()

    // submits new word_list form to db
    createWordListForm.addEventListener('submit', function(e) {
        e.preventDefault();
        createFormHandler(e)
    })
    
    // displays create new wordlist form
    newListButton.addEventListener("click", () => {
        catContainer.className = "show"
    })

    // pulls category id/name & displays associated lists
    
})

function getCategories() {
    fetch(words_url)
    .then(resp => resp.json())
    .then(words => {
        words.data.forEach( word => {
            let newWord = new Word(word, word.attributes)

            document.querySelector('#words-container').insertAdjacentHTML("beforeend", newWord.renderWordCard())
        })
    })
    // .catch(err => console.log(err))
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
    .then(words => {
        const word = words.data

        let newWord = new Word(word, word.attributes)
       
        document.querySelector('#words-container').insertAdjacentHTML("beforeend", newWord.renderWordCard())
    })
}
