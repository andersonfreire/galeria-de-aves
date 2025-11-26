// Importações dos módulos
import { AveService } from "./service/AveService.js";
import { Ave } from "./model/Ave.js";
import { createAveCard } from "./components/AveCard.js";

// Instância do Serviço
const service = new AveService();

// Seletores do DOM
const grid = document.getElementById("item-grid");
const form = document.getElementById("item-form");
const feedback = document.getElementById("feedback-message");
const filterButtons = document.getElementById("filter-buttons");
const btnSubmit = document.getElementById("form-submit-btn");
const btnCancel = document.getElementById("form-cancel-btn");

// Cache local para os itens
let allItems = []; 

document.addEventListener("DOMContentLoaded", () => {
  loadItems();
  
  form.addEventListener("submit", handleFormSubmit);
  filterButtons.addEventListener("click", handleFilter);
  btnCancel.addEventListener("click", resetForm);
});

/* Carrega os itens do Firebase e renderiza o grid. */
async function loadItems() {
  grid.innerHTML = "";

  try {
    // Tenta buscar os dados
    allItems = await service.fetchItems();
    // Tenta renderizar os dados
    renderGrid(allItems);

  } catch (error) {
    // Se algo falhar (fetch ou renderGrid)
    console.error("ERRO FATAL em loadItems():", error);
    showFeedback("error", "Erro ao carregar a galeria: " + error.message);
  }
}

/* Renderiza uma lista de itens no grid do DOM. */
function renderGrid(items) {
  grid.innerHTML = ""; 
  if (items.length === 0) {
    grid.innerHTML = `<p class="text-center empty-gallery-message">Nenhuma ave encontrada.</p>`;
    return;
  }
  
  items.forEach((ave, index) => {
    const card = createAveCard(ave, service, loadItems);
    grid.appendChild(card);
  });
}

/* Exibe mensagens de feedback */
function showFeedback(type, message = "") {
  if (!feedback) {
     console.error("ERRO CRÍTICO: A variável 'feedback' é nula!");
    return;
  }
  feedback.innerHTML = "";
  feedback.className = "alert";

  if (type === "loading") {
    feedback.classList.add("alert-info");
    feedback.textContent = "Salvando, por favor aguarde...";
  } else if (type === "success") {
    feedback.classList.add("alert-success");
    feedback.textContent = message;
  } else if (type === "error") {
    feedback.classList.add("alert-danger");
    feedback.textContent = message;
  }
  
  if (type !== "loading") {
    setTimeout(() => {
      feedback.innerHTML = "";
      feedback.className = "alert d-none";
    }, 3000);
  }
}

/* Filtro por categoria */
function handleFilter(event) {
  if (event.target.tagName !== "BUTTON") return;
  
  const categoria = event.target.dataset.categoria;

  filterButtons.querySelectorAll('button').forEach(btn => btn.classList.remove('btn-primary'));
  filterButtons.querySelectorAll('button').forEach(btn => btn.classList.add('btn-outline-primary'));
  event.target.classList.add('btn-primary');
  event.target.classList.remove('btn-outline-primary');

  if (categoria === "Todos") {
    renderGrid(allItems);
  } else {
    const filteredItems = allItems.filter(
      (item) => item.categoria === categoria
    );
    renderGrid(filteredItems);
  }
}

/* Formulário para adição e edição */
async function handleFormSubmit(event) {
  event.preventDefault(); 

  const aveData = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    categoria: document.getElementById("categoria").value,
    imagem: document.getElementById("imagem").value,
    nomeCientifico: document.getElementById("nomeCientifico").value,
    habitat: document.getElementById("habitat").value,
  };

  const mode = form.dataset.mode;
  const id = form.dataset.id;

  showFeedback("loading");

  try {
    if (mode === "edit") {
      await service.updateItem(id, aveData);
      showFeedback("success", "Ave atualizada com sucesso!");
    } else {
      await service.addItem(aveData);
      showFeedback("success", "Ave adicionada com sucesso!");
    }
    resetForm();
    await loadItems(); 
  } catch (error) {
    console.error("ERRO em handleFormSubmit():", error);
    showFeedback("error", "Erro ao salvar: " + error.message);
  }
}

/* Reseta o formulário para o estado inicial */
function resetForm() {
  document.getElementById("form-title").textContent = "Adicionar Ave";
  form.reset();
  delete form.dataset.mode;
  delete form.dataset.id;
  
  btnSubmit.textContent = "Adicionar Item";
  btnSubmit.className = "btn btn-primary";
}