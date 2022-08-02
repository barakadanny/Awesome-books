const bookLists = document.querySelector('.books-list');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const addBookBtn = document.querySelector('.add-book-btn');

// retrieve data
const RetrieveBooks = JSON.parse(localStorage.getItem('books'));

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  // add book
  addBook(title, author) {
    this.new = 'new';
    const newBook = { title, author };
    if (localStorage.getItem('books')) {
      let availableBooks = JSON.parse(localStorage.getItem('books'));
      availableBooks = [newBook, ...availableBooks];
      localStorage.setItem('books', JSON.stringify(availableBooks));
    } else {
      localStorage.setItem('books', JSON.stringify([newBook]));
    }
  }

  // remove Book
  removeBook(id) {
    this.new = 'new';
    const bookList = RetrieveBooks.filter(
      (book) => book.title !== RetrieveBooks[id].title,
    );
    localStorage.setItem('books', JSON.stringify(bookList));
  }
}

const newBook = new Book();

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const bTitle = bookTitle.value;
  const bAuthor = bookAuthor.value;

  newBook.addBook(bTitle, bAuthor);
  document.location.reload();
});

RetrieveBooks.forEach((book) => {
  const singleBook = document.createElement('tr');
  singleBook.innerHTML = `
            <td>" ${book.title} " by ${book.author}</td>
            <td><input class="remove" type="submit" value="Remove"></td>
        `;

  const removeBtn = singleBook.querySelector('.remove');

  const id = RetrieveBooks.indexOf(book);

  // remove a book
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newBook.removeBook(id);
    document.location.reload();
  });

  bookLists.appendChild(singleBook);
});
