class Word {
    constructor(word, wordAttributes) {
        this.id = word.id
        this.title = wordAttributes.title
        this.word_list = wordAttributes.word_list
        this.category = wordAttributes.category
        Word.all.push(this)
    }

    renderWordCard() {
        return `
        <div data-id=${this.id}>
            <h3> ${this.title} </h3>
            <p> ${this.word_list} </p>
            <p> ${this.category.name} </p>
            <button data-id=${this.id}>edit</button>
        </div>
        <br><br>`
    }
}

Word.all = []