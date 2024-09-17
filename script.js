document.getElementById('produto-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;
    adicionarProduto(nome, quantidade, preco);
    limparFormulario();
});

document.getElementById('fornecedor-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome-fornecedor').value;
    const contato = document.getElementById('contato-fornecedor').value;
    adicionarFornecedor(nome, contato);
    limparFormularioFornecedor();
});

document.getElementById('reabastecimento-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const produto = document.getElementById('produto-reabastecimento').value;
    const quantidade = document.getElementById('quantidade-reabastecimento').value;
    adicionarReabastecimento(produto, quantidade);
});

document.getElementById('pedido-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const produto = document.getElementById('produto-pedido').value;
    const quantidade = document.getElementById('quantidade-pedido').value;
    const fornecedor = document.getElementById('fornecedor-pedido').value;
    fazerPedido(produto, quantidade, fornecedor);
});

function adicionarProduto(nome, quantidade, preco) {
    const tabela = document.getElementById('tabela-estoque').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    const celulaNome = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    const celulaPreco = novaLinha.insertCell(2);
    const celulaAcoes = novaLinha.insertCell(3);
    celulaNome.innerText = nome;
    celulaQuantidade.innerText = quantidade;
    celulaPreco.innerText = preco;
    const botaoRemover = document.createElement('button');
    botaoRemover.classList.add('remover');
    botaoRemover.innerText = 'Remover';
    botaoRemover.addEventListener('click', function () {
        removerProduto(novaLinha);
    });
    celulaAcoes.appendChild(botaoRemover);
    registrarHistorico(`Produto adicionado: ${nome}`, quantidade);
}

function adicionarFornecedor(nome, contato) {
    const tabela = document.getElementById('tabela-fornecedores').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    const celulaNome = novaLinha.insertCell(0);
    const celulaContato = novaLinha.insertCell(1);
    const celulaAcoes = novaLinha.insertCell(2);
    celulaNome.innerText = nome;
    celulaContato.innerText = contato;
    const botaoRemover = document.createElement('button');
    botaoRemover.classList.add('remover');
    botaoRemover.innerText = 'Remover';
    botaoRemover.addEventListener('click', function () {
        removerFornecedor(novaLinha);
    });
    celulaAcoes.appendChild(botaoRemover);
}

function adicionarReabastecimento(produto, quantidade) {
    const tabela = document.getElementById('tabela-reabastecimento').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    const celulaProduto = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    const celulaStatus = novaLinha.insertCell(2);
    celulaProduto.innerText = produto;
    celulaQuantidade.innerText = quantidade;
    celulaStatus.innerText = 'Pendente';
    registrarHistorico(`Reabastecimento solicitado: ${produto}`, quantidade);
}

function fazerPedido(produto, quantidade, fornecedor) {
    const tabela = document.getElementById('tabela-pedidos').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    const celulaProduto = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    const celulaFornecedor = novaLinha.insertCell(2);
    const celulaStatus = novaLinha.insertCell(3);
    celulaProduto.innerText = produto;
    celulaQuantidade.innerText = quantidade;
    celulaFornecedor.innerText = fornecedor;
    celulaStatus.innerText = 'Em andamento';
    registrarHistorico(`Pedido de compra: ${produto} de ${fornecedor}`, quantidade);
}

function removerProduto(linha) {
    linha.remove();
}

function removerFornecedor(linha) {
    linha.remove();
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
}

function limparFormularioFornecedor() {
    document.getElementById('nome-fornecedor').value = '';
    document.getElementById('contato-fornecedor').value = '';
}

function registrarHistorico(movimentacao, quantidade) {
    const tabela = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    const data = new Date().toLocaleString();
    const celulaData = novaLinha.insertCell(0);
    const celulaMovimentacao = novaLinha.insertCell(1);
    const celulaProduto = novaLinha.insertCell(2);
    const celulaQuantidade = novaLinha.insertCell(3);
    celulaData.innerText = data;
    celulaMovimentacao.innerText = movimentacao;
    celulaQuantidade.innerText = quantidade;
}

function gerarRelatorio() {
    const relatorio = document.getElementById('relatorio-content');
    const tabela = document.getElementById('tabela-estoque').innerHTML;
    relatorio.innerHTML = `<h3>Relatório de Estoque</h3>${tabela}`;
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultTab").click();
