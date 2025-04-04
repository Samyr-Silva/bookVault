// Função para carregar os livros do backend
function showBooks() {
    console.log("entrou");
    fetch("http://localhost:8080/vault/list")
        .then(response => response.json())
        .then(books => {
            let content = '<h2>Lista de Livros Disponíveis</h2><div id="books-container">';
            books.forEach(book => {
                content += `
                    <div class="book-card">
                        <h3>${book.title}</h3>
                        <p><strong>Autor:</strong> ${book.author}</p>
                        <p><strong>Categoria:</strong> ${book.category}</p>
                        <p><strong>Ano:</strong> ${book.year}</p>
                        <p><strong>Disponível:</strong> ${book.available ? "Sim" : "Não"}</p>
                    </div>
                `;
            });
            content += '</div>';
            document.getElementById("content").innerHTML = content;
        })
        .catch(error => console.error("Erro ao carregar livros:", error));
}

// Função para exibir o formulário de solicitação de livros
function showRequestForm() {
    document.getElementById("content").innerHTML = `
        <h2>Solicitar Novo Livro</h2>
        <form id="requestForm">
            <input type="text" id="title" placeholder="Título do livro" required />
            <input type="text" id="category" placeholder="Categoria" required />
            <input type="text" id="author" placeholder="Autor" required />
            <input type="number" id="year" placeholder="Ano de publicação" required />
            <input type="number" id="readerId" placeholder="Seu ID de leitor" required />
            <button type="submit">Solicitar Livro</button>
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
            document.getElementById("responseMessage").innerText = "✅ Livro solicitado com sucesso!";
        })
        .catch(error => {
            console.error("Erro ao solicitar livro:", error);
            document.getElementById("responseMessage").innerText = "❌ Erro ao solicitar livro. Tente novamente.";
        });
    });
}

