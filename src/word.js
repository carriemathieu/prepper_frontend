class Word {
    constructor(word, wordAttributes) {
        this.id = word.id
        this.title = wordAttributes.title
        this.word_list = wordAttributes.word_list
        this.category = wordAttributes.category
        Word.all.push(this)
    }

    renderWordCard(){ 
        return `
            <div data-id=${this.id} class="wordListCard">
                <h3> Word List Title: ${this.title} </h3>
                <p> Category: ${this.category.name} </p>
            </div>
            <br><br>` 
    }
}

Word.all = []