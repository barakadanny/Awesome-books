import store from './store.js';

class ui {
  static displayBooks() {
    const books = store.getBooks();
    books.forEach((book) => ui.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('.books-list');
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><input class="remove" type="submit" value="Remove"></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('.book-title').value = '';
    document.querySelector('.book-author').value = '';
  }
}

export default ui;
