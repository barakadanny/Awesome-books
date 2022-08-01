const addBook = document.querySelector('.addBook');
const bookList = document.querySelector('.bookList');

// add book to the list using an object
addBook.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('.book-title').value;
  const bookAuthor = document.querySelector('.book-author').value;

  const book = new Book(bookTitle, bookAuthor);
});
