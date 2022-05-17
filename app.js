let library = [{
  'Title': 'Sample',
  'Author': 'GUstavo',
  'Pages': 5000
},
{
  'Title': 'Sample2',
  'Author': 'Henrique',
  'Pages': 1000
}]

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

// Lopping through the library and calling a function for each book
library.forEach(book => {
  addToUI(book)
  console.log(book)
})

// Function which add book to the interface
function addToUI(book) {
  // creating a new div
  const div = document.createElement('div')
  div.classList.add('new-book')
  // 
  const navBook = document.querySelector('nav')
  console.log(navBook)

  // Insert 
  div.innerHTML = `
  <a class="remove-book" href="#">X</a>

  <p>${book.Title}</p>
  <p>Pages: ${book.Pages}</p>
  <p>Author: ${book.Author}</p>
  <p>Read already: Yes</p>`

  // adding book to the nav
  navBook.appendChild(div)

  console.log(book.Title)
}

function clearAndClose() {

  // Setting the field values to nothing
  document.getElementById('title-book').value = ''
  document.getElementById('author-book').value = ''
  document.getElementById('pages-book').value = ''

  // Showing alert message that the books was added
  // setTimeout(function () { document.querySelector('.message-add').hidden = false }, 3000)
}

function showAlert(message, className) {
  const messageUI = document.querySelector('.message')
  // Setting the hidden attribute to false
  messageUI.hidden = false
  // Adding the className to the messageUI
  messageUI.classList.add(className)
  messageUI.innerText = message
  // After 3 seconds the message will fade away
  setTimeout(function () {
    messageUI.hidden = true
  }, 3000)
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

  // Check if all fields are not empty
  if (title === '' || author === '' || pages === '') {

    // Call the show alert function with the message and the className
    showAlert('Please fill all fields', 'error')
  } else {
    // Adding the new book 
    addBookToLibrary(newBook)

    // Cleaning the fields
    clearAndClose()

  }


  // Prevent the default behavior of the submit button
  e.preventDefault()
})
console.log(bookForm)
