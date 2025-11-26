// Componente reutilizável (Card)

/* Função auxiliar para corrigir URLs. */
function getCorrigidoGitHubUrl(url) {
  if (url.includes("github.com") && url.includes("/blob/")) {
    // Converte: https://github.com/user/repo/blob/main/img.png
    // Para:     https://raw.githubusercontent.com/user/repo/main/img.png
    return url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
  }
  // Se não for um URL do GitHub ou já estiver correto, retorna o original.
  return url;
}

export function createAveCard(ave, service, loadItemsFunc) {
  
  // Grid responsivo do framework (Bootstrap)
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 mb-4"; // Define as colunas do grid

  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm"; // h-100 para altura igual

  // Cria o wrapper para a imagem
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "card-img-wrapper";

  // Imagem do item
  const img = document.createElement("img");
  img.className = "card-img-top";
  
  // URL da imagem é passada pela função de correção antes de ser definida
  img.src = getCorrigidoGitHubUrl(ave.imagem); 
  
  img.alt = ave.titulo;

  // Adiciona a imagem ao seu wrapper
  imgWrapper.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column"; // d-flex para alinhar os botões

  // Título e descrição
  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = ave.titulo;

  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = ave.descricao;

  // Campos específicos visíveis
  const scientificName = document.createElement("p");
  scientificName.className = "card-subtitle mb-2 text-muted";
  scientificName.innerHTML = `<strong>Nome Científico:</strong> <i>${ave.nomeCientifico}</i>`;

  const habitat = document.createElement("p");
  habitat.className = "card-text";
  habitat.innerHTML = `<strong>Habitat:</strong> ${ave.habitat}`;

  // Container para botões (para alinhar no final do card)
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "mt-auto pt-3"; // mt-auto alinha no final

  // Botão "Editar"
  const btnEdit = document.createElement("button");
  btnEdit.className = "btn btn-secondary me-2";
  btnEdit.textContent = "Editar";
  btnEdit.addEventListener("click", () => {
    // Altera o título do formulário
    document.getElementById("form-title").textContent = "Editar Ave";
    
    // Preenche o formulário com os dados do card
    document.getElementById("titulo").value = ave.titulo;
    document.getElementById("descricao").value = ave.descricao;
    document.getElementById("categoria").value = ave.categoria;
    document.getElementById("imagem").value = ave.imagem;
    document.getElementById("nomeCientifico").value = ave.nomeCientifico;
    document.getElementById("habitat").value = ave.habitat;

    // Define o modo do formulário para "edição"
    const form = document.getElementById("item-form");
    form.dataset.mode = "edit";
    form.dataset.id = ave.id;
    
    // Altera o botão do formulário
    document.getElementById("form-submit-btn").textContent = "Atualizar Item";
    document.getElementById("form-submit-btn").className = "btn btn-warning";
    
    // Rola a página para o formulário
    form.scrollIntoView({ behavior: "smooth" });
  });

  // Botão "Remover"
  const btnRemove = document.createElement("button");
  btnRemove.className = "btn btn-danger";
  btnRemove.textContent = "Remover";
  btnRemove.addEventListener("click", async () => {
    if (confirm(`Tem certeza que deseja remover "${ave.titulo}"?`)) {
      try {
        await service.removeItem(ave.id);
        await loadItemsFunc(); // Recarrega a lista
      } catch (error) {
        alert("Erro ao remover: " + error.message);
      }
    }
  });

  // Montagem do Card
  buttonGroup.appendChild(btnEdit);
  buttonGroup.appendChild(btnRemove);

  cardBody.appendChild(title);
  cardBody.appendChild(scientificName);
  cardBody.appendChild(description);
  cardBody.appendChild(habitat);
  cardBody.appendChild(buttonGroup);

  // Adiciona o wrapper da imagem ao card, antes do cardBody 
  card.appendChild(imgWrapper);
  card.appendChild(cardBody);

  col.appendChild(card);
  return col;
}