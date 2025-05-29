import Aluno from "./Aluno.js"; //Importando um arquivo externo

let alunos = JSON.parse(localStorage.getItem("alunos")) || []; //Transforma o bloco de códigos de texto em um array no Local Storage.
const form = document.querySelector("#formulario");

form.addEventListener("submit", (evento) => {
  //Um evento a partir do submit do input(Quando ele clica acontece esse evento)
  evento.preventDefault();

  const nome = document.getElementById("name").value.trim(); //Tá pegando do input o valor e está guardando em uma constante.
  const esporte = document.getElementById("sport").value.trim();

  if (!nome || !esporte) {
    alert("Por favor, preencha nome e esporte.");
    return; // impede adicionar aluno vazio
  }

  let aluno = new Aluno(); //Novo aluno vai ser criado
  aluno.setNome(nome); // e ele vai criar a chave com o valor do input
  aluno.setEsporte(esporte);

  alunos.push({
    chave: aluno.getNome(), //vai puxar esse valor no local storage
    valor: aluno.getEsporte(),
  });

  localStorage.setItem("alunos", JSON.stringify(alunos)); //Pega o bloco do local storage e transforma em um texto .JSON

  form.reset(); //Redefine o formulario
});

// Função para listar alunos
function listarAlunos() {
  const lista = JSON.parse(localStorage.getItem("alunos")) || [];
  let listaHTML = ""; //cria um campo na pagina do html

  lista.forEach((aluno, index) => {
    //Percorre os elementos e cria o texto no campo do html
    listaHTML += `
      <p>
        <strong>Nome:</strong> ${aluno.chave} | 
        <strong>Esporte:</strong> ${aluno.valor}
        <button class="editar" data-index="${index}">Editar</button>
        <button class="excluir" data-index="${index}">Excluir</button>
      </p>`;
  });

  document.getElementById("listaAlunos").innerHTML = listaHTML; // o campo da div no html vai receber essa lista

  // Botões excluir
  document.querySelectorAll(".excluir").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      lista.splice(index, 1);
      localStorage.setItem("alunos", JSON.stringify(lista));
      alunos = lista; // Atualiza a variável global também
      listarAlunos();
    });
  });

  // Botões editar
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

// Botão listar todos
let listar = document.getElementById("id_listar");
listar.addEventListener("click", (evento) => {
  // Quando clicar no botão ele pega a id dele e chama a função listarAluno's
  evento.preventDefault();
  listarAlunos();
});

const dialog = document.createElement("dialog"); //Cria um novo elemento HTML dialog
dialog.innerHTML = `
  <form method="dialog" id="editarForm">
    <h3>Editar Aluno</h3>
    <label for="editNome">Nome:</label>
    <input type="text" id="editNome" required />
    <label for="editEsporte">Esporte:</label>
    <input type="text" id="editEsporte" required />
    <input type="hidden" id="editIndex" />
    <button type="submit">Salvar</button>
    <button type="button" id="cancelarEditar">Cancelar</button>
  </form>
`; // Dentro dela vai ter esse texto que em cada elemento que for editado ele vai ser chamado abaixo

form.appendChild(dialog); //Executa esse bloco de códigos

document.getElementById("editarForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const index = document.getElementById("editIndex").value; //Pega o valor do id acima
  const nome = document.getElementById("editNome").value.trim(); //Pega o valor do id e nao deixa ele colocar espaços em branco
  const esporte = document.getElementById("editEsporte").value.trim(); // pega o valor do id e tambem nao deixa colocar espaços em branco

  if (!nome || !esporte) {
    alert("Por favor, preencha nome e esporte.");
    return;
  }

  alunos[index] = {
    chave: nome,
    valor: esporte,
  };

  localStorage.setItem("alunos", JSON.stringify(alunos)); // Converte o valor do JS para o texto .JSON e coloca o Storage editado
  dialog.close(); // fecha o dialog
  listarAlunos(); //retorna o campo da listagem dos alunos
});

document.getElementById("cancelarEditar").addEventListener("click", () => {
  dialog.close(); // quando clicar em fechar o dialog
});
