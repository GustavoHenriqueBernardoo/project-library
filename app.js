let library = [
  {
    'Title': 'Sample',
    'Author': 'GUstavo',
    'Pages': 5000
  },
  {
    'Title': 'Sample2',
    'Author': 'Henrique',
    'Pages': 1000
  }
]

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
  updateUI()
  console.log(library)
}

function deleteBook(target) {
  if (target.classList.contains('remove-book')) {
    target.parentElement.remove()
  }
}

function updateUI() {
  // Lopping through the library and calling a function for each book
  library.forEach(book => {
    addToUI(book)
  })
  // Resetting the array to not add twice
  library = []
}

// Function which add book to the interface
function addToUI(book) {
  // creating a new div
  const div = document.createElement('div')
  div.classList.add('new-book')
  // 
  const navBook = document.querySelector('nav')
  // Insert 
  div.innerHTML = `
  <a class="remove-book" href="#">X</a>

  <p>${book.Title}</p>
  <p>Pages: ${book.Pages}</p>
  <p>Author: ${book.Author}</p>
  <p>Read already:</p>
  <label class="switch">
    <input class="checkbox" type="checkbox" checked />
    <span class="slider round"></span>
  </label>`

  // adding book to the nav
  navBook.appendChild(div)
}

function clearAndClose() {

  // Setting the field values to nothing
  document.getElementById('title-book').value = ''
  document.getElementById('author-book').value = ''
  document.getElementById('pages-book').value = ''

  // Close the modal after 3 seconds
  // setTimeout(function () {
  //   modal.style.opacity = 0
  //   modal.style.zIndex = -1
  // }, 3000)

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

function openModal() {

  // Inner modal
  modal.style.opacity = 1
  modal.style.zIndex = 999

  // Modal Outer
  modalOuter.style.opacity = 1
  modalOuter.style.pointerEvents = 'all'
}

function closeModal() {

  // Inner modal
  modal.style.opacity = 0
  modal.style.zIndex = -1

  // Modal Outer
  modalOuter.style.opacity = 0
  modalOuter.style.pointerEvents = 'none'
}



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

    // Show a message that the book was added
    showAlert('Book were added', 'success')

    // Cleaning the fields
    clearAndClose()
  }


  // Prevent the default behavior of the submit button
  e.preventDefault()
})

const bookList = document.getElementById('book-list').addEventListener('click', (e) => {

  // Removing the book which was clicked
  deleteBook(e.target)


  // checkbox
  if (e.target.classList.contains('checkbox')) {
    console.log(e.target.checked)
  }

  // Show a message that the book was added
  showAlert('Book deleted', 'success')
})


// Get modal elements
const modal = document.querySelector('.modal')
const modalOuter = document.querySelector('.modal-outer')

// Open the modal
document.querySelector('.addBook').addEventListener('click', openModal)

// Close the modal
const closeBtn = document.querySelector('.btnClose').addEventListener('click', closeModal)

modalOuter.addEventListener('click', (e) => {

  // Checking if clicked in the modal inside or outside
  const isOutside = !e.target.closest('.modal')

  // If you click in the outside modal, close the modal
  if (isOutside) {
    closeModal()
  }
})

// Update the UI means, to loop through the library and update the UI
updateUI()