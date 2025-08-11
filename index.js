"use strict";
class Livro {
    constructor(titulo, categoria, ano, autor) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.ano = ano;
        this.autor = autor;
        this.emprestado = false;
    }
}
class Biblioteca {
    constructor() {
        this.cadastro = [];
        this.livros = [];
    }
    AdicionarLivro() {
        let menu = "📚 Adicionar Livros:\n";
        let titulo = prompt(menu + 'digite um titulo:');
        let categoria = prompt(menu + 'digite uma categoria:');
        let ano1 = prompt(menu + 'digite ano:\n preecher somente com numero!');
        let autor = prompt(menu + 'digite um autor:');
        if (!titulo || !categoria || !ano1 || !autor) {
            alert('preecha todos os campos para adicionar livros');
        }
        else {
            let ano = Number(ano1);
            if (isNaN(ano)) {
                alert('ano invalido');
                return;
            }
            let jaexiste;
            jaexiste = false;
            for (let i = 0; i < this.livros.length; i++) {
                if (this.livros[i].titulo == titulo && this.livros[i].categoria == categoria && this.livros[i].ano == ano && this.livros[i].autor == autor) {
                    jaexiste = true;
                }
            }
            if (jaexiste) {
                alert('Livro ja adicionado');
            }
            else {
                let novo = new Livro(titulo, categoria, ano, autor);
                this.livros.push(novo);
                alert('livro adicionado com sucesso');
            }
        }
    }
    Listalivros() {
        if (this.livros.length == 0) { //verifica se tem livros adicionado no array livros 
            alert('Nenhum livro adicionado para listar'); //se nao tiver ele emprime essa memsagem
        }
        else {
            let lista = "Lista:\n";
            for (let i = 0; i < this.livros.length; i++) {
                lista = lista + (i + 1) + '->' + (this.livros[i].titulo) + '(' + (this.livros[i].categoria) + ')' + '(' + (this.livros[i].ano) + ')' + '(' + (this.livros[i].autor) + ')' + "\n";
            }
            alert(lista);
        }
    }
    RemoverLivros() {
        if (this.livros.length == 0) { //verifica se tem livros adicionado no array livros 
            alert('Nenhum livro adicionado para remover'); //se nao tiver ele emprime essa memsagem
        }
        else {
            let lista = 'Lista: \n';
            for (let i = 0; i < this.livros.length; i++) {
                lista = lista + (i + 1) + '->' + (this.livros[i].titulo) + '(' + (this.livros[i].categoria) + ')' + '(' + (this.livros[i].ano) + ')' + '(' + (this.livros[i].autor) + ')' + "\n";
            }
            let resposta;
            resposta = Number(prompt(lista + 'Escolha o numero do livro para remover:')); //pergunta para o usuario
            if (resposta >= 1 && resposta <= this.livros.length) { //so permite resposta >= 1 <=tamanho do array
                this.livros.splice(resposta - 1, 1); //remove o livro na pos certa ex:(1 - 1,1); = pos 1 - 1 = 0; remove um elemento
                alert('Livro removido com sucesso');
            }
            else {
                alert('opcao invalida');
            }
        }
    }
    Buscarlivros() {
        let resposta;
        resposta = String(prompt('Pesquisar livros: \n'));
        if (resposta == null || resposta == "") {
            alert('Operacao cancelada');
            return;
        }
        let jaexiste;
        jaexiste = false;
        for (let i = 0; i < this.livros.length; i++) {
            if (this.livros[i].titulo == resposta || this.livros[i].autor == resposta) {
                jaexiste = true;
            }
        }
        if (!jaexiste) {
            alert('Lista: \n\n Livro nao encontrado');
        }
        else {
            let resultado = "Resultado: \n";
            for (let i = 0; i < this.livros.length; i++) {
                if (this.livros[i].titulo == resposta || this.livros[i].autor == resposta) {
                    resultado = resultado + (i + 1) + '->' + (this.livros[i].titulo) + '(' + (this.livros[i].categoria) + ')' + '(' + (this.livros[i].ano) + ')' + '(' + (this.livros[i].autor) + ')' + "\n";
                }
            }
            alert(resultado);
        }
    }
    Cadastrousuario() {
        var _a;
        let resposta;
        resposta = Number(prompt('Menu:\n1-> Cadastrar novo\n2-> Login'));
        // CADASTRO
        if (resposta == 1) {
            let nome = String(prompt('Cadastro:\n-> Nome:'));
            let senha = String(prompt('Cadastro:\n-> Senha:'));
            if (!nome || !senha) {
                alert('Preencha todos os campos para cadastrar a conta');
                return;
            }
            let jaexiste = false;
            for (let i = 0; i < this.cadastro.length; i += 2) {
                if (this.cadastro[i] == nome && this.cadastro[i + 1] == senha) {
                    jaexiste = true;
                }
            }
            if (jaexiste) {
                alert('Conta já cadastrada, faça o login direto');
            }
            else {
                this.cadastro.push(nome, senha);
                alert('Conta cadastrada com sucesso');
            }
        }
        if (resposta == 2) {
            let nome1 = String(prompt('Login:\n-> Digite seu usuário'));
            let senha1 = String(prompt('Login:\n-> Digite sua senha'));
            if (!nome1 || !senha1) {
                alert('Operação cancelada');
                return;
            }
            let jaexiste;
            jaexiste = false;
            for (let i = 0; i < this.cadastro.length; i += 2) {
                if (this.cadastro[i] == nome1 && this.cadastro[i + 1] == senha1) {
                    jaexiste = true;
                }
            }
            if (!jaexiste) {
                alert('Senha ou usuário incorretos');
            }
            else {
                alert('Acesso liberado');
                let acao = Number(prompt("1-> Emprestar livro\n2-> Devolver livro"));
                // EMPRESTAR
                if (acao == 1) {
                    let disponiveis = this.livros.filter(l => !l.emprestado);
                    if (disponiveis.length === 0) {
                        alert("Nenhum livro disponível para empréstimo.");
                        return;
                    }
                    let lista = "Lista: livros disponíveis para empréstimo:\n\n";
                    for (let i = 0; i < disponiveis.length; i++) {
                        lista = lista + (i + 1) + '->' + (disponiveis[i].titulo) + '(' + (disponiveis[i].categoria) + ')' + '(' + (disponiveis[i].ano) + ')' + '(' + (disponiveis[i].autor) + ')' + '\n';
                    }
                    let escolha = Number(prompt(lista + "\nEscolha um número acima para pedir empréstimo:")) - 1;
                    if (disponiveis[escolha]) {
                        disponiveis[escolha].emprestado = true;
                        disponiveis[escolha].prazoDevolucao = Date.now() + 30 * 1000; // 30 segundos
                        alert(`Livro emprestado! Prazo: 30 segundos.`);
                    }
                    else {
                        alert("Livro inválido ou já emprestado.");
                    }
                }
                // DEVOLVER
                if (acao == 2) {
                    let tituloDev = prompt("Digite o título do livro para devolver:");
                    let encontrado = false;
                    for (let i = 0; i < this.livros.length; i++) {
                        if (this.livros[i].titulo == tituloDev && this.livros[i].emprestado) {
                            encontrado = true;
                            let agora = Date.now();
                            if (((_a = this.livros[i]) === null || _a === void 0 ? void 0 : _a.prazoDevolucao) !== undefined && agora <= this.livros[i].prazoDevolucao) {
                                alert("Devolução no prazo! Nenhuma multa.");
                            }
                            else {
                                alert("Atrasado! Multa aplicada.");
                            }
                            this.livros[i].emprestado = false;
                            this.livros[i].prazoDevolucao = undefined;
                            return;
                        }
                    }
                    if (!encontrado) {
                        alert("Livro não encontrado ou não está emprestado.");
                    }
                }
            }
        }
    }
}
let minhaBiblioteca = new Biblioteca(); //cria o biblioteca
//mostrar opcoes
//permitir que o usuário escolha uma opção
//retornar a opção (0-> sair, 1->func 01, 2->func 02, 3->func 03...)
function acessar() {
    let resposta;
    resposta = Number(prompt('|-------------------------------BIBLIOTECA----------------------------------|Menu:\n1-> Adicionar Livros  \n2📚-> Lista Livros \n3🚮-> Excluir Livros \n4-> Buscar livros\n5-> Emprestimo de livros\n6-> Sair'));
    while (isNaN(resposta) || resposta < 0 || resposta > 7) {
        alert('opção inválida');
        resposta = Number(prompt('Menu:\n1-> Adicionar Livros  \n2📚-> Lista Livros \n3🚮-> Excluir Livros \n4-> Buscar livros\n5-> Emprestimo de livros\n6-> Sair'));
    }
    return resposta;
}
function executarOpcao(opcao) {
    if (opcao == 1) {
        minhaBiblioteca.AdicionarLivro();
    }
    if (opcao == 2) {
        minhaBiblioteca.Listalivros();
    }
    if (opcao == 3) {
        minhaBiblioteca.RemoverLivros();
    }
    if (opcao == 4) {
        minhaBiblioteca.Buscarlivros();
    }
    if (opcao == 5) {
        minhaBiblioteca.Cadastrousuario();
    }
}
let desejaSair = false;
while (!desejaSair) {
    let resposta;
    resposta = acessar();
    if (resposta != 6) {
        executarOpcao(resposta);
    }
    else {
        alert('Adeus e obrigado por todos os peixes.');
        desejaSair = true;
    }
}
