// "Forma de bolo" de uma tarefa
function Tarefa(nome, categoria, realizada) {
    this.nome = nome;
    this.categoria = categoria;
    this.realizada = realizada;
}

// definindo o metodo a nivel de classe utilizando o prototype
Tarefa.prototype.adicionaNaPagina = function() {
    const listaDeTarefas = document.querySelector('#lista-tarefas');
    // utilizando createElement ao inves de concatenar ao innerHTML
    // para poder definir o evento de click para concluir a tarefa
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('item-tarefa', `categoria-${this.categoria}`);
    if (this.realizada) novaTarefa.classList.add('marcado');
    novaTarefa.innerHTML = this.nome;
    novaTarefa.addEventListener('click', concluiTarefa);
    listaDeTarefas.appendChild(novaTarefa);
}

let tarefas = [
    new Tarefa('Comprar Iorgute', 'compras', false), 
    new Tarefa('Assitir um Filme', 'lazer', true),
    new Tarefa('Livro de Java', 'estudos', false)
];

for (let tarefa of tarefas) {
    tarefa.adicionaNaPagina();
}

// incluir uma nova tarefa
function incluiTarefa(event) {
    const nome = document.querySelector('#nova-tarefa-nome');
    if (nome) {
        const categoria = document.querySelector('#nova-tarefa-categoria');
        const tarefa = new Tarefa(nome.value, categoria.value, false);
        tarefas.push(tarefa);
        tarefa.adicionaNaPagina();
        nome.value = '';
        categoria.value = 'lazer';
    }
    else {
        console.log('Não dá pra procrastinar o que não existe!');
    }
}

document.querySelector('#incluir-nova-tarefa').addEventListener('click', incluiTarefa);

// filtrar por categoria
document.querySelector('#filtro-de-categoria').addEventListener('change', (event) => {
    const categoria = event.currentTarget.value;
    const listaDeTarefas = document.querySelectorAll('#lista-tarefas li');
    if (categoria) {
        for (let tarefa of listaDeTarefas) {
            if (tarefa.classList.contains(`categoria-${categoria}`)) {
                tarefa.classList.remove('retido-no-filtro');
            }
            else tarefa.classList.add('retido-no-filtro');
        }
    }
    else {
        for (let tarefa of listaDeTarefas) {
            tarefa.classList.remove('retido-no-filtro');
        }
    }
});

// enviar a tarefa pressionando enter
document.querySelector('#nova-tarefa-nome').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        incluiTarefa();
    }
});

// concluindo uma tarefa
function concluiTarefa(event) {
    const tarefa = event.currentTarget;
    tarefa.classList.toggle('marcado');
}