"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceLivro = void 0;
const RepositoryInstituicao_1 = require("../repositories/RepositoryInstituicao");
const RepositoryLivro_1 = require("../repositories/RepositoryLivro");
class ServiceLivro {
    constructor(repositoryinstituicao, repositorylivro) {
        this.repositoryinstituicao = repositoryinstituicao ?? new RepositoryInstituicao_1.InstituicaoRepository();
        this.repositorylivro = repositorylivro ?? new RepositoryLivro_1.RespositoryLivro();
    }
    async cadastrarLivro(data) {
        const existeInstituicao = await this.repositoryinstituicao.listarId(data.instituicaoID);
        if (!existeInstituicao) {
            throw new Error("Instuição não existe.");
        }
        let dados;
        dados = {
            nome: data.nome,
            autor: data.autor,
            ano: data.ano,
            categoria: data.categoria,
            quantidade: data.quantidade,
            instituicaoID: data.instituicaoID
        };
        const resposta = await this.repositorylivro.cadastrarLivro(dados);
        if (!resposta) {
            throw new Error("Não foi possivel cadastrar livro.");
        }
        return resposta;
    }
    async listarTodos() {
        const resposta = await this.repositorylivro.listaLivros();
        return resposta;
    }
    async listaLivrosInstituicao(id) {
        const instituicaoID = this.repositoryinstituicao.listarId(id);
        const temLivro = await this.repositorylivro.listaLivrosInstituicao(id);
        if (!instituicaoID) {
            throw new Error("Instituição não existe.");
        }
        if (temLivro.length == 0) {
            throw new Error("Não possui livros cadastrados");
        }
        return temLivro;
    }
    async listarId(id) {
        const existe = await this.repositorylivro.listaLivrosId(id);
        if (!existe) {
            throw new Error("Este livro não existe.");
        }
        return existe;
    }
    async atualizarLivro(id, data) {
        const existe = await this.repositorylivro.listaLivrosId(id);
        if (!existe) {
            throw new Error("Livro não existe");
        }
        if (data.instituicaoID) {
            const existeInstituicao = await this.repositoryinstituicao.listarId(data.instituicaoID);
            if (!existeInstituicao) {
                throw new Error("Instituição não encontrada.");
            }
        }
        const resposta = await this.repositorylivro.atualizarLivro(id, {
            nome: data.nome ?? existe.nome,
            autor: data.autor ?? existe.autor,
            ano: data.ano ?? existe.ano,
            quantidade: data.quantidade ?? existe.quantidade,
            categoria: data.categoria ?? existe.categoria,
            instituicaoID: data.instituicaoID ?? existe.instituicaoID
        });
        return {
            id: resposta.id,
            nome: resposta.nome,
            autor: resposta.autor,
            ano: resposta.ano,
            categoria: resposta.categoria,
            quantidade: resposta.quantidade,
            instituicaoID: resposta.instituicaoID
        };
    }
    async delete(id) {
        const exiteLivro = this.repositorylivro.listaLivrosId(id);
        if (!exiteLivro) {
            throw new Error("Livro não existe.");
        }
        const resposta = await this.repositorylivro.deleteLivro(id);
        if (resposta == 0) {
            throw new Error("Não foi possivel apagar este livro.");
        }
        return resposta;
    }
}
exports.ServiceLivro = ServiceLivro;
