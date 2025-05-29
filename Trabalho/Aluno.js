export default class Aluno {
  #nome;
  #esporte;

  getNome() {
    return this.#nome;
  }

  setNome(nome) {
    this.#nome = nome;
  }

  getEsporte() {
    return this.#esporte;
  }

  setEsporte(esporte) {
    this.#esporte = esporte;
  }

  constructor(nome, esporte) {
    this.#nome = nome;
    this.#esporte = esporte;
  }
}
