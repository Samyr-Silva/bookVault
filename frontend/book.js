// book.js

// Pega o ID do livro da URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

if (!bookId) {
  document.getElementById("book-name").textContent = "Nenhum ID de livro fornecido.";
} else {
  // Busca os dados do livro no backend
  fetch(`http://localhost:8080/vault/get/${bookId}`)
    .then(res => res.json())
    .then(book => {
      // Preenche os dados do livro
      document.getElementById('book-name').textContent = book.title;
      document.getElementById('book-author').textContent = `Autor: ${book.author}`;
      document.getElementById('book-category').textContent = `Categoria: ${book.category}`;
      document.getElementById('book-year').textContent = `Ano: ${book.year}`;

      const statusEl = document.getElementById('book-status');
      if (book.available) {
        statusEl.textContent = "Available";
        statusEl.classList.remove('bg-red-600');
        statusEl.classList.add('bg-green-600');
      } else {
        statusEl.textContent = "Unavailable";
        statusEl.classList.remove('bg-green-600');
        statusEl.classList.add('bg-red-600');
      }

      // Busca sinopse e imagem na API do Google Books
      fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}`)
        .then(res => res.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            const gBook = data.items[0].volumeInfo;

            // Sinopse
            document.getElementById('book-synopsis').textContent =
              gBook.description || "Sinopse não disponível.";

            // Capa
            if (gBook.imageLinks?.thumbnail) {
              const img = document.createElement('img');
              img.src = gBook.imageLinks.thumbnail.replace('http://', 'https://');
              img.alt = `Capa de ${book.title}`;
              img.className = "w-full h-auto object-cover rounded-lg shadow";

              const coverDiv = document.getElementById("book-cover");
              coverDiv.innerHTML = "";
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
