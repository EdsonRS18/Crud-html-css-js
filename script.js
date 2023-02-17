const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sSobrenome = document.querySelector('#m-sobrenome')
const sPlano = document.querySelector('#m-plano')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sSobrenome.value = itens[index].sobrenome
    sPlano.value = itens[index].plano
    id = index
  } else {
    sNome.value = ''
    sSobrenome.value = ''
    sPlano.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.sobrenome}</td>
    <td>${item.plano}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sSobrenome.value == '' || sPlano.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].sobrenome = sSobrenome.value
    itens[id].plano = sPlano.value
  } else {
    itens.push({'nome': sNome.value, 'sobrenome': sSobrenome.value, 'plano': sPlano.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

var precos = {
  "Musculação mensal": 100,
  "Musculação semestral": 80,
  "Musculação anual": 60,
  "Luta mensal": 80,
  "Luta semestral": 60,
  "Luta anual": 50,
  "Crossfit mensal": 150,
  "Crossfit semestral": 120,
  "Crossfit anual": 100,
};

var campoDeSelecao = document.getElementById("m-plano");
var resultado = document.getElementById("resultado");

campoDeSelecao.addEventListener("change", function() {
  var itemSelecionado = campoDeSelecao.value;
  var preco = precos[itemSelecionado];
  resultado.innerHTML = "O preço do " + itemSelecionado + " é: R$" + preco;
});

var form = document.querySelector('form');