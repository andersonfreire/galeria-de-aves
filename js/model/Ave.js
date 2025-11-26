/* Classe Ave */
export class Ave {
  constructor({
    id,
    titulo,
    descricao,
    categoria,
    imagem,
    nomeCientifico,
    habitat,
  }) {
    this.id = id; // id (do Firebase)
    this.titulo = titulo; 
    this.descricao = descricao; 
    this.categoria = categoria; 
    this.imagem = imagem; 

    // 2 campos específicos do tema
    this.nomeCientifico = nomeCientifico;
    this.habitat = habitat;
  }
}