class Word {
    constructor(word, wordAttributes) {
        this.id = word.id
        this.title = wordAttributes.title
        this.word_list = wordAttributes.word_list
        this.category = wordAttributes.category
        Word.all.push(this)
    }

    renderCategories() {
        return `
         ${this.category.name}`
    }

    renderWordCard(){ 
    return `
    <div data-id=${this.id}>
        <h3> ${this.title} </h3>
        <p> ${this.category.name} </p>
    </div>
    <br><br>` }
}

Word.all = []