class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this._out = false;
        this.dueDate = null;
        this.patron = null;
    }

    set out(out) {
        this._out = out;
        if (out) {
            const newDueDate = new Date();
            this.dueDate = newDueDate.setDate(newDueDate.getDate() - 14);
        } else {
            this.dueDate = null;
        }
    }

    get out() {
        return this._out;
    }
}