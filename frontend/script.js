// Função para carregar os livros do backend
function showBooks() {
    console.log("entrou");
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
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">Autor: ${book.author}</div>
                    <div class="book-category">${book.category}</div>
                    <div class="book-year">${book.year}</div>
                    <div class="book-available ${availabilityClass}">${availabilityText}</div>
                `;
                container.appendChild(bookCard);
            });
        })
        .catch(error => console.error("Erro to loading books:", error));
}

// Função para exibir o formulário de solicitação de livros
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
                `;
                requestsList.appendChild(requestCard);
            });
        })
        .catch(error => console.error("Erro on loading solicitations:", error));
}

// Função para aprovar uma solicitação
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

// Carregar solicitações assim que a página for carregada
window.onload = loadRequests;

