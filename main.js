import Book from './modules/book.js';
import ui from './modules/ui.js';
import store from './modules/store.js';

const addBook = document.querySelector('.add-book');

// display books event
document.addEventListener('DOMContentLoaded', ui.displayBooks);

// add book to the list using an object
addBook.addEventListener('submit', (e) => {
  e.preventDefault();

  const bookTitle = document.querySelector('.book-title').value;
  const bookAuthor = document.querySelector('.book-author').value;

  const book = new Book(bookTitle, bookAuthor);

  // add book to the list
  ui.addBookToList(book);

  // Add book to the store
  store.addBook(book);

  // clear fields
  ui.clearFields();

  // Remove book from store
  store.removeBook(
    e.target.previousElementSibling.previousElementSibling.textContent
  );
});
