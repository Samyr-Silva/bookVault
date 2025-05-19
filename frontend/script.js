// to loading the books from backend
function showBooks() {
    document.getElementById("content").innerHTML = `
     <h2>Welcome to Book Vault</h2>
    <p>choose your option above to see books or request one.</p>
    <div id="books-container"></div>
    `;

    fetch("http://localhost:8080/vault/list")
        .then(response => response.json())
        .then(books => {
            const container = document.getElementById("books-container");
            container.innerHTML = ""; // Limpa antes de adicionar novos

            books.forEach(book => {
                const bookCard = document.createElement("div");
            
                bookCard.classList.add("book-card");

                const availabilityClass = book.available ? "true" : "false";
                const availabilityText = book.available ? "Available" : "Unavailable";


                bookCard.innerHTML = `
                <a href = "book.html?id=${book.id}">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">Autor: ${book.author}</div>
                    <div class="book-category">${book.category}</div>
                    <div class="book-year">${book.year}</div>
                    <div class="book-available ${availabilityClass}">${availabilityText}</div>
                </a>
                `;
                container.appendChild(bookCard);
            });
        })
        .catch(error => console.error("Erro to loading books:", error));
}

// Show the form of request
function showRequestForm() {
    document.getElementById("content").innerHTML = `
        <h2>Solicitar Novo Livro</h2>
        <form id="requestForm">
            <input type="text" id="title" placeholder="book's title" required />
            <input type="text" id="category" placeholder="Category" required />
            <input type="text" id="author" placeholder="Author" required />
            <input type="number" id="year" placeholder="Year" required />
            <input type="number" id="readerId" placeholder="Your ID reader" required />
            <button type="submit">Request book</button>
        </form>
        <p id="responseMessage"></p>
        <div id="books-container"></div>
    `;

    document.getElementById("requestForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const readerId = parseInt(document.getElementById("readerId").value);
        const requestBook = {
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            author: document.getElementById("author").value,
            year: parseInt(document.getElementById("year").value)
        };

        fetch(`http://localhost:8080/request/${readerId}/request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBook)
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("responseMessage").innerText = "✅ This was a success!";
        })
        .catch(error => {
            console.error("Erro ao solicitar livro:", error);
            document.getElementById("responseMessage").innerText = "❌ Error. Try again.";
        });
    });

    
}

// load the requests

function loadRequests() {
    fetch("http://localhost:8080/request/list")
        .then(response => response.json())
        .then(requests => {
            const requestsList = document.getElementById("requests-list");
            requestsList.innerHTML = ''; // Limpar as solicitações antigas
            requests.forEach(request => {
                const requestCard = document.createElement("div");
                requestCard.classList.add("request-card");
                requestCard.innerHTML = `
                    <p><strong>Title:</strong> ${request.title}</p>
                    <p><strong>Category:</strong> ${request.category}</p>
                    <p><strong>Author:</strong> ${request.author}</p>
                    <p><strong>Year:</strong> ${request.year}</p>
                    <button onclick="approveRequest(${request.id})">Approve Request</button>
                    <button class="button-reject" onclick="rejectRequest(${request.id})">Reject Request</button>

                `;
                requestsList.appendChild(requestCard);
            });
        })
        .catch(error => console.error("Erro on loading solicitations:", error));
}

// approve requests
function approveRequest(requestId) {
    fetch(`http://localhost:8080/request/${requestId}/approve`, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {
        alert(data); // Exibe a resposta da aprovação
        loadRequests(); // Atualiza a lista após aprovação
    })
    .catch(error => console.error("Error to approve solicitation:", error));
}

// reject requests
function rejectRequest(requestId) {
    fetch(`http://localhost:8080/request/${requestId}/reject`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data); // Exibe a resposta da aprovação
        loadRequests(); // Atualiza a lista após aprovação
    })
    .catch(error => console.error("Error to reject solicitation:", error));
}

 async function showFavorites() {
        const content = document.getElementById('content');
        content.innerHTML = "<h2>Your Favorite Books</h2>";

        // Pega o usuário logado do localStorage
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const readerId = loggedUser ? loggedUser.id : null;

        if (!readerId) {
          alert("Você precisa fazer login para ver seus favoritos.");
          window.location.href = "index.html";
          return;
        }

        try {
          const res = await fetch(`http://localhost:8080/fav/${readerId}/list`);
          if (!res.ok) throw new Error("Nenhum favorito encontrado.");

          const favorites = await res.json();

          if (favorites.length === 0) {
            content.innerHTML += "<p>You have no favorite books yet.</p>";
            return;
          }

          // Container para os favoritos
          const favList = document.createElement("div");
          favList.id = "favorites-list";

          favorites.forEach(fav => {
            const book = fav.book; // assumindo estrutura do backend

            const item = document.createElement("div");
            item.className = "favorite-item p-4 border-b";

            item.innerHTML = `
              <h3 class="text-lg font-bold">${book.title}</h3>
              <p>Author: ${book.author}</p>
              <p>Category: ${book.category}</p>
              <p>Year: ${book.year}</p>
            `;

            favList.appendChild(item);
          });

          content.appendChild(favList);

        } catch (error) {
          console.error(error);
          content.innerHTML += "<p>Failed to load favorite books.</p>";
        }
      }

// load the requests already
window.onload = loadRequests;

