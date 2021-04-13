class Category {
    constructor(category, name) {
        this.id = category.id
        this.name = name
        Category.all.push(this)
    }

    renderCategories() {
        return this.category.name
    }

}

Category.all = []