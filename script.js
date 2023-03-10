const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCpf = document.querySelector('#m-cpf')
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
    sCpf.value = itens[index].cpf
    sPlano.value = itens[index].plano
    id = index
  } else {
    sNome.value = ''
    sCpf.value = ''
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
    <td>${item.cpf}</td>
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
  
  if (sNome.value == '' || sCpf.value == '' || sPlano.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cpf = sCpf.value
    itens[id].plano = sPlano.value
  } else {
    itens.push({'nome': sNome.value, 'cpf': sCpf.value, 'plano': sPlano.value})
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
  "Muscula????o mensal": 100,
  "Muscula????o semestral": 80,
  "Muscula????o anual": 60,
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
  resultado.innerHTML = "O pre??o do " + itemSelecionado + " ??: R$" + preco;
});

var form = document.querySelector('form');


