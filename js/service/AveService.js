import { Ave } from "../model/Ave.js";

// Classe de Serviço
// Utiliza a URL do projeto criado no Firebase
const FIREBASE_URL = "SUA_URL_AQUI";
const RESOURCE_PATH = "aves.json"; // Tabela no Firebase

export class AveService {
  
  async fetchItems() {
    const response = await fetch(`${FIREBASE_URL}${RESOURCE_PATH}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do Firebase.");
    }
    const data = await response.json();
    
    // Converte a resposta do Firebase (objeto) em um array de Aves
    if (!data) return []; // Retorna array vazio se não houver dados
    
    return Object.keys(data).map((key) => {
      return new Ave({ id: key, ...data[key] });
    });
  }

  async addItem(aveData) {
    const response = await fetch(`${FIREBASE_URL}${RESOURCE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aveData),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar item.");
    }
  }

  async removeItem(id) {
    const deleteUrl = `${FIREBASE_URL}aves/${id}.json`; // URL específica do item
    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao remover item.");
    }
  }

  async updateItem(id, aveData) {
    const updateUrl = `${FIREBASE_URL}aves/${id}.json`; // URL específica do item
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aveData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar item.");
    }
  }
}