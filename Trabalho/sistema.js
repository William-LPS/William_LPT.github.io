import Aluno from "./Aluno.js";

let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

const form = document.querySelector("#formulario");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("name").value.trim();
  const esporte = document.getElementById("sport").value.trim();

  if (!nome || !esporte) {
    alert("Por favor, preencha nome e esporte.");
    return;
  }

  let aluno = new Aluno();
  aluno.setNome(nome);
  aluno.setEsporte(esporte);

  alunos.push({
    chave: aluno.getNome(),
    valor: aluno.getEsporte(),
  });

  localStorage.setItem("alunos", JSON.stringify(alunos));

  form.reset();
});

function listarAlunos() {
  const lista = JSON.parse(localStorage.getItem("alunos")) || [];
  let listaHTML = "";

  lista.forEach((aluno, index) => {
    listaHTML += `
      <p>
        <strong>Nome:</strong> ${aluno.chave} | 
        <strong>Esporte:</strong> ${aluno.valor}
        <button class="editar" data-index="${index}">Editar</button>
        <button class="excluir" data-index="${index}">Excluir</button>
      </p>`;
  });

  document.getElementById("listaAlunos").innerHTML = listaHTML;

  document.querySelectorAll(".excluir").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      lista.splice(index, 1);
      localStorage.setItem("alunos", JSON.stringify(lista));
      alunos = lista;
      listarAlunos();
    });
  });

  document.querySelectorAll(".editar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const aluno = lista[index];
      document.getElementById("editNome").value = aluno.chave;
      document.getElementById("editEsporte").value = aluno.valor;
      document.getElementById("editIndex").value = index;
      dialog.showModal();
    });
  });
}

let listar = document.getElementById("id_listar");
listar.addEventListener("click", (evento) => {
  evento.preventDefault();
  listarAlunos();
});

const dialog = document.createElement("dialog");
dialog.innerHTML = `
  <form method="dialog" id="editarForm">
    <h3>Editar Aluno/Modalidade:</h3>
    <label for="editNome">Nome:</label>
    <input type="text" id="editNome" required />
    <label for="editEsporte">Esporte:</label>
    <input type="text" id="editEsporte" required />
    <input type="hidden" id="editIndex" />
    <button type="submit" id="salvarForm">Salvar</button>
    <button type="button" id="cancelarEditar">Cancelar</button>
  </form>
`;

form.appendChild(dialog);

document.getElementById("editarForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const index = document.getElementById("editIndex").value;
  const nome = document.getElementById("editNome").value.trim();
  const esporte = document.getElementById("editEsporte").value.trim();
  if (!nome || !esporte) {
    alert("Por favor, preencha nome e esporte.");
    return;
  }

  alunos[index] = {
    chave: nome,
    valor: esporte,
  };

  localStorage.setItem("alunos", JSON.stringify(alunos));
  dialog.close();
  listarAlunos();
});

document.getElementById("cancelarEditar").addEventListener("click", () => {
  dialog.close();
});
