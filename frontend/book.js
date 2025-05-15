const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

fetch(`http://localhost:8080/vault/get/${bookId}`)
  .then(response => response.json())
  .then(book => {
    document.getElementById("book-name").textContent = `NAME: ${book.title}`;
    document.getElementById("book-author").textContent = `Author: ${book.author}`;
    document.getElementById("book-category").textContent = `Category: ${book.category}`;
    document.getElementById("book-year").textContent = `Year: ${book.year}`;
    document.getElementById("book-status").textContent = `Status: ${book.available ? "Available" : "Unavailable"}`;
  })
  .catch(error => {
    console.error("Error fetching book:", error);
    document.body.innerHTML += "<p style='color: red;'>Failed to load book data.</p>";
  });