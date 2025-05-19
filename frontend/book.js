const urlParams = new URLSearchParams(window.location.search);
const bookIda = urlParams.get("id");

fetch(`http://localhost:8080/vault/get/${bookIda}`)
  .then(response => response.json())
  .then(book => {
    document.getElementById("book-name").textContent = `${book.title}`;
    document.getElementById("book-author").textContent = `Author: ${book.author}`;
    document.getElementById("book-category").textContent = `Category: ${book.category}`;
    document.getElementById("book-year").textContent = `Year: ${book.year}`;
    document.getElementById("book-status").textContent = `Status: ${book.available ? "Available" : "Unavailable"}`;
  })
  .catch(error => {
    console.error("Error fetching book:", error);
    document.body.innerHTML += "<p style='color: red;'>Failed to load book data.</p>";
  });
  // book.js

// Pega o parâmetro da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const bookId = getQueryParam("id");

if (!bookId) {
  document.getElementById("book-name").textContent = "Nenhum ID de livro fornecido.";
} else {
  // 1. Pega os dados do backend
  fetch(`http://localhost:8080/vault/get/${bookIda}`)
    .then(res => res.json())
    .then(book => {
      document.getElementById('book-name').textContent = `${book.title}`;
      document.getElementById('book-author').textContent = `Autor: ${book.author}`;
      document.getElementById('book-category').textContent = `Categoria: ${book.category}`;
      document.getElementById('book-year').textContent = `Ano: ${book.year}`;
      document.getElementById('book-status').textContent = book.available ? "Available" : "Unvailable";

       const statusEl = document.getElementById('book-status');
      if (book.available) {
        statusEl.textContent = "Available";
        statusEl.classList.remove('bg-red-600');
        statusEl.classList.add('bg-green-600');
      } else {
        statusEl.textContent = "Unvailable";
        statusEl.classList.remove('bg-green-600');
        statusEl.classList.add('bg-red-600');
      }
      // 2. Busca sinopse e capa na Google Books
      fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}`)
        .then(res => res.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            const gBook = data.items[0].volumeInfo;

            // Sinopse
            document.getElementById('book-synopsis').textContent = gBook.description || "Sinopse não disponível.";

            // Capa
            if (gBook.imageLinks?.thumbnail) {
              const img = document.createElement('img');
              img.src = gBook.imageLinks.thumbnail.replace('http://', 'https://');
              img.alt = `Capa de ${book.title}`;
              img.className = "w-full h-auto object-cover rounded-lg shadow";

              const coverDiv = document.getElementById("book-cover");
              coverDiv.innerHTML = "";  // limpa conteúdo antigo
              coverDiv.appendChild(img);
            }
      } else {
            document.getElementById('book-synopsis').textContent = "Sinopse não encontrada.";
          }
        });
    })
    .catch(err => {
      console.error("Erro ao buscar dados:", err);
      document.getElementById("book-name").textContent = "Erro ao carregar informações.";
    });
    
}
