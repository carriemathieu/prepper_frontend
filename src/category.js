class Category {
    constructor(category, categoryAttributes) {
        this.id = category.id
        this.name = categoryAttributes.name
        Category.all.push(this)
    }

    // to render category dropdown & dynamically add
    renderCategory() {
        return this.name
    }
}

Category.all = []