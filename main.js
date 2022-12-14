class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const booksAr = [];

/* eslint max-classes-per-file: ["error", 2] */

class DisplayBook {
  static addBook(newBook, index) {
    const lib = document.querySelector('.books-list');
    if (!localStorage.getItem('books')) {
      const noBook = document.createElement('p');
      noBook.innerHTML = 'No books in library';
      lib.appendChild(noBook);
    }
    const container = document.createElement('div');
    container.classList.add('book');
    container.innerHTML = `
    <div class="book-details">
     <h3></h3>
     <p>" ${newBook.title} " by ${newBook.author}</p>
    </div>
     <button class="delete" data-remove=${index}>Delete</button>
     `;
    lib.appendChild(container);

    booksAr.push(newBook);
  }

  // delete function
  static deleteBook(index) {
    booksAr.splice(index, 1);
    DisplayBook.setStorage();
  }

  // set local storage
  static setStorage() {
    localStorage.setItem('books', JSON.stringify(booksAr));
  }

  // fetch local storage
  static getStorage() {
    if (localStorage.getItem('books')) {
      const books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book, index) => {
        const newBook = new Book(book.title, book.author);
        DisplayBook.addBook(newBook, index);
      });
    } else {
      localStorage.setItem('books', JSON.stringify(booksAr));
    }
    const deleteBtn = document.querySelectorAll('.delete');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.remove;
        DisplayBook.deleteBook(index);
        DisplayBook.setStorage();
        e.target.parentElement.remove();
      });
    });
  }
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('.book-title').value;
  const author = document.querySelector('.book-author').value;

  if (title !== '' && author !== '') {
    const newBook = new Book(title, author);
    DisplayBook.addBook(newBook);

    DisplayBook.setStorage(newBook);

    document.querySelector('.book-title').value = '';
    document.querySelector('.book-author').value = '';
  }

  const deleteBtn = document.querySelectorAll('.delete');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.remove;
      DisplayBook.deleteBook(index);
      e.target.parentElement.remove();
    });
  });
});

DisplayBook.getStorage();

// select tabs
const list = document.querySelector('#list');
const add = document.querySelector('#add-new');
const contact = document.querySelector('#contact');

// select sections
const books = document.querySelector('#books');
const addBook = document.querySelector('#addBooks');
const contactSection = document.querySelector('#contact-section');

// add event listener on list
list.addEventListener('click', (e) => {
  e.preventDefault();
  books.style.display = 'flex';
  addBook.style.display = 'none';
  contactSection.style.display = 'none';
});

// add event listener on add
add.addEventListener('click', (e) => {
  e.preventDefault();
  books.style.display = 'none';
  addBook.style.display = 'flex';
  contactSection.style.display = 'none';
});

// add event listener on contact
contact.addEventListener('click', (e) => {
  e.preventDefault();
  books.style.display = 'none';
  addBook.style.display = 'none';
  contactSection.style.display = 'flex';
});

// change tabs js function
function openTab(e) {
  let i;
  const tabLinks = document.getElementsByClassName('menu-item');
  for (i = 0; i < tabLinks.length; i += 1) {
    tabLinks[i].className = tabLinks[i].className.replace('active', '');
  }
  e.currentTarget.className += ' active';
}

const menuItem = document.querySelectorAll('.menu-item');

// add event listener on menu items
menuItem.forEach((item) => {
  item.addEventListener('click', openTab);
});
