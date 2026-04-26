"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceInstituicao = void 0;
const RepositoryInstituicao_1 = require("../repositories/RepositoryInstituicao");
const bcrypt_1 = __importDefault(require("bcrypt"));
/*Testado*/
class ServiceInstituicao {
    constructor(repositoryinstituicao) {
        this.repositoryinstituicao = repositoryinstituicao ?? new RepositoryInstituicao_1.InstituicaoRepository();
    }
    async login(data) {
        const existe = await this.repositoryinstituicao.listarEmail(data.email);
        if (!existe) {
            throw new Error("Intituição não encontrado.");
        }
        const senhaSegura = await bcrypt_1.default.compare(data.senha, existe.senha);
        if (!senhaSegura) {
            throw new Error("Email ou senha incorretas.");
        }
        let response;
        response = {
            id: existe.id,
            email: existe.email,
            nome: existe.nome,
            createdAt: existe.createdAt
        };
        return response;
    }
    async cadastrar(data) {
        const existe = await this.repositoryinstituicao.listarEmail(data.email);
        if (existe) {
            throw new Error("Email ja cadastrado.");
        }
        const senhaSegura = await bcrypt_1.default.hash(data.senha, 10);
        const dados = {
            nome: data.nome,
            email: data.email,
            senha: senhaSegura
        };
        let resposta;
        resposta = await this.repositoryinstituicao.cadastrar(dados);
        if (!resposta) {
            throw new Error("Não foi possivel Cadastrar Instituição.");
        }
        resposta = {
            id: resposta.id,
            email: resposta.email,
            nome: resposta.nome,
            createdAt: resposta.createdAt
        };
        return resposta;
    }
    async listar() {
        let resposta = await this.repositoryinstituicao.listar();
        return resposta.map(elemento => ({
            id: elemento.id,
            email: elemento.email,
            nome: elemento.nome,
            createdAt: elemento.createdAt
        }));
    }
    async listarId(id) {
        let resposta = await this.repositoryinstituicao.listarId(id);
        if (!resposta) {
            throw new Error("Intituição não encontrado.");
        }
        return {
            id: resposta.id,
            email: resposta.email,
            nome: resposta.nome,
            createdAt: resposta.createdAt
        };
    }
    async atualizar(id, data) {
        const resposta = await this.repositoryinstituicao.listarId(id);
        if (!resposta) {
            throw new Error("Instituição não encontrada.");
        }
        let senhaSegura = resposta.senha;
        if (data.senha) {
            senhaSegura = await bcrypt_1.default.hash(data.senha, 10);
        }
        const update = await this.repositoryinstituicao.atualizar(id, {
            nome: data.nome ?? resposta.nome,
            email: data.email ?? resposta.email,
            senha: senhaSegura
        });
        return {
            id: update.id,
            email: update.email,
            nome: update.nome,
            createdAt: update.createdAt
        };
    }
    async deletar(id) {
        const existeInstituicao = await this.repositoryinstituicao.listarId(id);
        if (!existeInstituicao) {
            throw new Error("Intituição não encontrado.");
        }
        const resposta = await this.repositoryinstituicao.deletar(id);
        if (resposta == 0) {
            throw new Error("Não foi possivel deletar.");
        }
        return resposta;
    }
}
exports.ServiceInstituicao = ServiceInstituicao;
