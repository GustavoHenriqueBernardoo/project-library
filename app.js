let library = []

function Book(title, author, pages, complete) {
  this.title = title,
    this.author = author,
    this.pages = pages,
    this.complete = "You didn't read it yet"
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.complete}`
}

Book.prototype.bookComplete = function (answer) {
  if (answer === 'yes') {
    return this.complete = `You read ${this.title}`
  } else {
    return this.complete = `You didn't read ${this.title} yet`
  }
}

function addBookToLibrary(book) {

}

const book1 = new Book('Mistborn', 'Brandon Sanderson', 380)
book1.bookComplete('n')

console.log(book1)
// console.log(book1.info())