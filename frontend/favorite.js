document.addEventListener("DOMContentLoaded", () => {
  const favoriteBtn = document.getElementById("favorite-btn");
  const heartIcon = document.getElementById("heart-icon");

  // Verifica se usuário está logado
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const readerId = loggedUser ? loggedUser.id : null;

  // Pega ID do livro da URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  // Verificações iniciais
  if (!readerId) {
    alert("Você precisa fazer login para favoritar.");
    window.location.href = "index.html";
    return;
  }

  if (!bookId) {
    alert("Livro inválido.");
    return;
  }

  // Atualiza visual do botão
  function updateFavoriteButton(isFavorited) {
    if (isFavorited) {
      favoriteBtn.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
      favoriteBtn.classList.add('bg-red-600', 'text-white', 'hover:bg-red-700');
      favoriteBtn.setAttribute('aria-pressed', 'true');
      heartIcon.setAttribute('fill', 'currentColor');
      favoriteBtn.textContent = "Favoritado";
      favoriteBtn.prepend(heartIcon);
    } else {
      favoriteBtn.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
      favoriteBtn.classList.remove('bg-red-600', 'text-white', 'hover:bg-red-700');
      favoriteBtn.setAttribute('aria-pressed', 'false');
      heartIcon.setAttribute('fill', 'none');
      favoriteBtn.textContent = "Favoritar";
      favoriteBtn.prepend(heartIcon);
    }
  }

  // Função para verificar se o livro já está favoritado
  async function checkIfFavorited() {
    try {
      const res = await fetch(`http://localhost:8080/fav/${readerId}/list`);
      if (!res.ok) return false;

      const favorites = await res.json();
      // Ajuste conforme sua estrutura, assumo que cada favorite tem um atributo book com id
      return favorites.some(fav => fav.book.id == bookId);
    } catch (error) {
      console.error("Erro ao verificar favoritos:", error);
      return false;
    }
  }

  // Estado inicial
  let isFavorited = false;

  // Inicializa o estado do botão com base no favorito
  checkIfFavorited().then(result => {
    isFavorited = result;
    updateFavoriteButton(isFavorited);
  });

  // Evento de clique no botão para favoritar
  favoriteBtn.addEventListener("click", async () => {
    try {
      // Aqui você pode alternar entre favoritar e desfavoritar se quiser
      // Por enquanto, só adiciona favorito
      if (isFavorited) {
        alert("Livro já está favoritado.");
        return;
      }

      const response = await fetch(`http://localhost:8080/fav/${readerId}/add/${bookId}`, {
        method: "POST"
      });

      if (!response.ok) throw new Error("Erro ao favoritar o livro.");

      isFavorited = true;
      updateFavoriteButton(isFavorited);
      alert("Livro favoritado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao favoritar. Tente novamente.");
    }
  });
});
