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
  library.push({ 'Title': book.title, 'Author': book.author, 'Pages': book.pages })
  console.log(library)
}

function clearAndClose() {

  // Setting the field values to nothing
  document.getElementById('title-book').value = ''
  document.getElementById('author-book').value = ''
  document.getElementById('pages-book').value = ''

  // Showing alert message that the books was added
  setTimeout(function () { document.querySelector('.message-add').hidden = false }, 3000)
}


const modal = document.querySelector('.modal')

// Open the modal
document.querySelector('.addBook').addEventListener('click', () => {
  modal.style.opacity = 1
  modal.style.zIndex = 999
})

// Close the modal
const closeBtn = document.querySelector('.btnClose').addEventListener('click', () => {
  modal.style.opacity = 0
  modal.style.zIndex = -1
})

// const submitBtn = document.querySelector('.submit').addEventListener('click', (e) => {
//   e.preventDefault()
//   const title = document.getElementById('title-book').value
//   const author = document.getElementById('author-book').value
//   const pages = document.getElementById('pages-book').value
//   const newBook = new Book(title, author, pages)
//   addBookToLibrary(newBook)
// })

const bookForm = document.querySelector('[name="book-form"]').addEventListener('submit', (e) => {

  // Get form values
  const title = e.currentTarget.title.value
  const author = e.currentTarget.author.value
  const pages = e.currentTarget.pages.value

  // Instantiating a new book
  const newBook = new Book(title, author, pages)

  // Adding the new book 
  addBookToLibrary(newBook)

  // Cleaning the fields
  clearAndClose()

  // Prevent the default behavior of the submit button
  e.preventDefault()
})
console.log(bookForm)
