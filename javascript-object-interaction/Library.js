class Library {
    constructor() {
        this.books = [];
        this.patrons = [];
        this.dailyFine = .1;
    }

    addBook(book) {
        this.books.push(book);
    }

    addPatron(patron) {
        this.patrons.push(patron);
    }

    chargeFines() {
        let today = new Date;
        let patronsWithOverdueBooks = this.patrons.filter(p => 
            p.currentBook != null && today > p.currentBook.dueDate);
        for (let p of patronsWithOverdueBooks)  {
            const dateDiff = new Date(today - patron.currentBook.dueDate);
            const daysLate = dateDiff.getDate();
            p.balance += this.dailyFine * daysLate;
        }
    }
}