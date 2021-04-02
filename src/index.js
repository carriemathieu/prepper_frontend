categories_url = "http://localhost:3000/api/categories"
words_url = "http://localhost:3000/api/words"

document.addEventListener('DOMContentLoaded', () => {
    const createWordListForm = document.querySelector("#create-word-list-form")
    const ready = document.querySelector("#ready")
    const newListButton = document.querySelector("#createList")
    const catContainer = document.querySelector("#category-container")
    const catDropDown = document.querySelector("#categories")
    const wordListDropDown = document.querySelector("#wordLists")

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
    catDropDown.addEventListener("change", (e) => {
        getWordListTitles(e)
    })

    ready.addEventListener("click", () => {
        chosenList = parseInt(wordListDropDown.value)
        document.querySelector("#instr_select_cat").className="hidden"
        document.querySelector("#results").className = "show"
        display = document.querySelector("#timer-container");
        startSpeechRecognition(chosenList)
    })
})

function getCategories() {
    fetch(words_url)
    .then(resp => resp.json())
    .then(words => {
        // let select = document.querySelector("#categories")
        words.data.forEach( word => {
            let newWord = new Word(word, word.attributes)
            // let opt = document.createElement("option")
            // opt.innerHTML = newWord.renderCategories()
            // select.appendChild(opt)
            document.querySelector('#words-container').insertAdjacentHTML("beforeend", newWord.renderWordCard())
        })
    })
    // .catch(err => console.log(err))
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const wordListInput = getWords()
    const categoryInput = document.querySelector("#formCategories").value
    const categoryId = parseInt(categoryInput)
    postFetch(titleInput, wordListInput, categoryId)
}

function getWordListTitles(e) {
    document.querySelector("#wordListsSelection").className = "show"

    // clears selections from previous in case user changes category
    document.querySelectorAll('#wordLists option').forEach(option => option.remove())

    // pulls category ID From selection
    let cat_id = e.target.options.selectedIndex 
    let select = document.querySelector("#wordLists")

    allWords = Word.all

    // loops through all word lists to see if the category ID matches cat id selected - creates dropdown of matching word lists
    for (let i=0; i < allWords.length; i++) {
        if (parseInt(allWords[i].category.id) == cat_id) {
            let opt = document.createElement("option")
            opt.value = parseInt(allWords[i].id)
            opt.innerText = allWords[i].title
            select.appendChild(opt)
        }
    }
}

// pushes all input words into word_list array for DB
function getWords() {
    let words = document.querySelectorAll("#input-word")
    let wordsinput = []

    for (let i = 0; i < words.length; i++) {
        wordsinput.push(words[i].value) 
    }
    return wordsinput 
} 

// sends form data to DB
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

        window.alert("New list created!")

        window.location.reload()
    })
}

function startTimer(duration, display, stopSpeech) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            document.querySelector("#timer-container").className = "hidden";
            stopSpeech()
        }
    }, 1000);
}

function displayResults(chosenList, finalTranscript) {
    let missedWords = []
    let points = 0
    let listOfWords = Word.all.find(x => x.id == chosenList) // gets words from chosen list dropdown
    let transcriptArray = finalTranscript.split(" ") // changes transcript to array
    let span = document.querySelector("#final_span")

    console.log(transcriptArray)
    
    for (let i=0; i < transcript.length; i++) {
         if (!listOfWords.includes(transcript[i])) {
            missedWords.push(transcript[i])
         } 
        return [missedWords]
    }
    span.innerText = `You scored ${points} points!`
}

function startSpeechRecognition(chosenList) {
    const stopSpeech = () => recognition.stop()
    startTimer(10, display, stopSpeech)

    // browser compatibility
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let finalTranscript = '';

    // creating new SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true

    // appends words together
    recognition.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } 
        }
        displayResults(chosenList, finalTranscript)
      }
    recognition.start()
}

