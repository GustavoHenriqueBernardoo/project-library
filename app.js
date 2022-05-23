let library = [
  {
    'Title': 'Sample',
    'Author': 'GUstavo',
    'Pages': 5000,
    'Complete': true

  },
  {
    'Title': 'Sample2',
    'Author': 'Henrique',
    'Pages': 1000,
    'Complete': false
  }
]

function Book(title, author, pages, complete) {
  this.title = title,
    this.author = author,
    this.pages = pages,
    this.complete = complete
}

Book.prototype.info = function (book) {
  // const booksUI = document.querySelectorAll('.new-book')
  // console.log(booksUI)
  // const asideUI = document.querySelector('aside')
  // asideUI.innerHTML = `
  // <div class="row-split">
  //       <h2>Book info</h2>
  //       <p>Total of Books: ${booksUI.length}</p>
  //       <p>BOoks Read:</p>
  //       <p>Books Unread</p>
  //       <p>Total of pages: 80</p>
  // </div>

  // `
  // return `${this.title} by ${this.author}, ${this.pages} pages, ${this.complete}`
}

// Book.prototype.bookComplete = function (answer) {
//   if (answer === 'yes') {
//     return this.complete = `You read ${this.title}`
//   } else {
//     return this.complete = `You didn't read ${this.title} yet`
//   }
// }

function addBookToLibrary(book) {
  library.push({ 'Title': book.title, 'Author': book.author, 'Pages': book.pages, 'Complete': book.complete })
  updateUI()
  // console.log(library)
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

  // Get books were added
  const booksUI = document.querySelectorAll('.new-book')
  // Get pages from the books were added
  const booksUiPages = document.querySelectorAll('.new-book .pages')
  // Get the checkbox from the books added
  const booksUiComplete = document.querySelectorAll('.new-book .checkbox')


  // Array to store all books pages
  let pagesCount = []

  // Looping through the pages node list
  booksUiPages.forEach(book => {

    //pushing only the pages numbers to the array
    pagesCount.push(parseInt(book.textContent.split(' ')[1]))
    // console.log(pagesCount)
  })

  // Array to store all books pages
  let readCount = []

  booksUiComplete.forEach(book => {
    readCount.push(book.checked)
  })

  console.log(readCount.filter(elem => elem === true).length)

  // Updating the Book info values
  const asideUI = document.querySelector('aside')

  // Updating the page information, using filter and reduce prototypes
  asideUI.innerHTML = `
  <div class="row-split">
        <h2>Book info</h2>
        <p>Total of Books: ${booksUI.length}</p>
        <p>Books Read: ${readCount.filter(elem => elem === true).length} </p>
        <p>Books Unread: ${readCount.filter(elem => elem === false).length}</p>
        <p>Total of pages: ${pagesCount.reduce((acc, num) => acc += num, 0)}</p>
  </div>
  `
}

// Function which add book to the interface
function addToUI(book) {
  // creating a new div
  const div = document.createElement('div')
  // add class to the div
  div.classList.add('new-book')

  const navBook = document.querySelector('nav')
  // Insert book into the HTML 
  div.innerHTML = `
  <a class="remove-book" href="#">X</a>

  <p>${book.Title}</p>
  <p class="pages">Pages: ${book.Pages}</p>
  <p>Author: ${book.Author}</p>
  <p>Read already:</p>
  <label class="switch">
    <input class="checkbox" type="checkbox" ${book.Complete ? 'checked' : ''} />
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
  document.getElementById('yes-type-1').checked = false
  document.getElementById('no-type-1').checked = false
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


// Get the book form and add an event listener to it when clicked submit
const bookForm = document.querySelector('[name="book-form"]').addEventListener('submit', (e) => {

  // Get form values
  const title = e.currentTarget.title.value
  const author = e.currentTarget.author.value
  const pages = e.currentTarget.pages.value
  let complete = false

  // Checking if the user read or not the book
  if (e.currentTarget.answer.value === 'true') complete = true
  // if the user did read the book, reassign the variable to true

  // Instantiating a new book
  const newBook = new Book(title, author, pages, complete)

  // Check if all fields are not empty
  if (title === '' || author === '' || pages === '') {

    // Call the show alert function with the message and the className
    showAlert('Please fill all fields', 'error')
  } else {

    // Adding the new book 
    addBookToLibrary(newBook)

    // Show a message that the book was added
    showAlert('Book added', 'success')

    // Cleaning the fields
    clearAndClose()
  }

  // close modal
  closeModal()

  // Prevent the default behavior of the submit button
  e.preventDefault()
})

// add event listener to the books that were already added and checking if you are deleting it or toggling the read functionality
const bookList = document.getElementById('book-list').addEventListener('click', (e) => {

  if (e.target.classList.contains('remove-book')) {
    // Removing the book which was clicked
    deleteBook(e.target)
    // Show a message that the book was added
    showAlert('Book deleted', 'success')
    updateUI()
  }


  // checkbox
  if (e.target.classList.contains('checkbox')) {
    // console.log(e.target.checked)
    updateUI()
  }
})


// Get modal elements
const modal = document.querySelector('.modal')
const modalOuter = document.querySelector('.modal-outer')

// Open the modal
document.querySelector('.addBook').addEventListener('click', openModal)

// Close the modal
const closeBtn = document.querySelector('.btnClose').addEventListener('click', closeModal)

// Click outside functionality
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