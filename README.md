# 🦅 Galeria de Aves do Seridó Potiguar

> Uma Single Page Application (SPA) interativa para catalogação, gerenciamento e visualização da fauna ornitológica da região do Seridó.

![Status Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=GREEN&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?style=for-the-badge&logo=firebase)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap_5-purple?style=for-the-badge&logo=bootstrap)

## 📋 Sobre o Projeto

Este projeto consiste em uma **Galeria Virtual** que implementa um ciclo completo de operações **CRUD** (Create, Read, Update, Delete). O objetivo é permitir que usuários cataloguem espécies de aves, registrando informações como nome científico, habitat, descrição e imagens.

A aplicação foi construída com uma arquitetura modular em JavaScript, consumindo uma API REST (Firebase Realtime Database) para persistência de dados, demonstrando competências em:
* Manipulação dinâmica do DOM.
* Requisições assíncronas (`fetch` API com `async/await`).
* Arquitetura de software em camadas (Service, Model, Component).

## 🚀 Tecnologias Utilizadas

* **HTML5 Semântico:** Estruturação da aplicação.
* **CSS3 & Bootstrap 5:** Estilização responsiva, sistema de grid e componentes de interface (Cards, Modais, Alertas).
* **JavaScript (ES6 Modules):**
    * **POO:** Uso de Classes para modelagem de dados (`Ave.js`) e serviços (`AveService.js`).
    * **Assincronismo:** Tratamento de promessas para comunicação com o backend.
* **Firebase Realtime Database:** Backend as a Service (BaaS) utilizado como banco de dados NoSQL.

## ⚙️ Configuração (Firebase)

Para que a aplicação funcione, é **necessário** configurar seu próprio banco de dados no Firebase, pois o código fonte atual possui um placeholder na URL de conexão. Siga os passos abaixo:

### 1. Criar Projeto no Firebase
1.  Acesse o [Console do Firebase](https://console.firebase.google.com/).
2.  Clique em **"Adicionar projeto"** e siga as instruções.

### 2. Configurar o Realtime Database
1.  No menu lateral do console, vá em **Criação** > **Realtime Database**.
2.  Clique em **"Criar Banco de Dados"**.
3.  Escolha o local do servidor (ex: Estados Unidos).
4.  **Importante:** No modo de segurança, selecione **"Iniciar no modo de teste"**.
    * *Nota: Isso permitirá leitura e escrita sem autenticação durante o desenvolvimento (regras `read: true`, `write: true`).*

### 3. Vincular ao Código
1.  Após criar o banco, copie a URL fornecida no topo da aba "Dados" (geralmente no formato `https://seu-projeto-id-default-rtdb.firebaseio.com/`).
2.  Abra o arquivo `js/service/AveService.js` no seu editor de código.
3.  Localize a constante `FIREBASE_URL` na linha 5 e substitua o valor:

```javascript
// Antes
const FIREBASE_URL = "SUA_URL_AQUI";

// Depois (Exemplo)
const FIREBASE_URL = "https://meu-projeto-aves-default-rtdb.firebaseio.com/";
```
**Atenção:** Mantenha a barra (`/`) no final da URL para garantir a correta concatenação dos endpoints.
## 📂 Estrutura do Projeto
O código está organizado seguindo o padrão de separação de responsabilidades:
```text
/
├── index.html              # Ponto de entrada e estrutura da UI
├── css/
│   └── style.css           # Estilos personalizados e tema "Natureza"
├── img/                    # Ativos de imagem (mapas, logos)
└── js/
    ├── main.js             # Controlador principal (Event Listeners e lógica de UI)
    ├── model/
    │   └── Ave.js          # Classe de Modelo (Entidade)
    ├── service/
    │   └── AveService.js   # Camada de comunicação com a API (Fetch)
    └── components/
        └── AveCard.js      # Componente reutilizável de renderização dos cards
```
## 🔧 Como Executar
1. Clone este repositório.
2. Realize a configuração do Firebase descrita acima.
3. Como o projeto utiliza **ES6 Modules** (`type="module"`), é necessário executar a aplicação através de um servidor local para evitar erros de CORS (Cross-Origin Resource Sharing).
   * **Sugestão:** Se estiver usando o VS Code, instale a extensão **Live Server**, clique com o botão direito no `index.html` e selecione "Open with Live Server".

## ✨ Funcionalidades
* **Listagem:** Visualização em grade de todas as aves cadastradas.
* **Filtro:** Filtragem dinâmica por categorias (Residente, Migratória, Urbana) sem recarregar a página.
* **Cadastro:** Formulário para inserção de novas espécies.
* **Edição:** Capacidade de carregar os dados de uma ave existente para atualização.
* **Exclusão:** Remoção de registros do banco de dados.
* **Correção de Imagens:** O sistema detecta e corrige automaticamente links de imagens do GitHub para garantir a renderização correta (`raw.githubusercontent`).

Desenvolvido por **Anderson Freire**
