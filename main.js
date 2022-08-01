/*eslint object-shorthand: "error"*/

const bookList = document.querySelector('.books-list');
const form = document.querySelector('form');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');

// array object
const books = [];

// function to store books localStorage
function storeBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

// function to create a new book
function createBook(title, author) {
  const newBook = {
    title: title,
    author: author,
  };
  books.push(newBook);

  const singleBook = document.createElement('tr');
  books.forEach((book, index) => {
    singleBook.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><input class="remove" type="submit" value="Remove"></td>
        `;

    const removeBtn = singleBook.querySelector('.remove');
    removeBtn.addEventListener('click', () => {
      books.splice(index, 1);
      singleBook.remove();
      storeBooks();
    });
  });

  // call the store books function
  storeBooks();

  bookList.appendChild(singleBook);
}

// add event to the form on submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    createBook(bookTitle.value, bookAuthor.value);

    bookTitle.value = '';
    bookAuthor.value = '';
  }
});

// function to retrieve book
function retrieveBooks() {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books) {
    books.forEach((book) => {
      createBook(book.title, book.author);
    });
  }
}
retrieveBooks();
