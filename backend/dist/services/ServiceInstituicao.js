"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceInstituicao = void 0;
const RepositoryInstituicao_1 = require("../repositories/RepositoryInstituicao");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ServiceInstituicao {
    constructor(repository) {
        this.repository = repository ?? new RepositoryInstituicao_1.InstituicaoRepository();
    }
    async login(data) {
        const existe = await this.repository.listarEmail(data.email);
        if (!existe) {
            throw new Error("Usuario não encontrado.");
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
        const existe = await this.repository.listarEmail(data.email);
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
        resposta = await this.repository.cadastrar(dados);
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
        let resposta = await this.repository.listar();
        return resposta.map(elemento => ({
            id: elemento.id,
            email: elemento.email,
            nome: elemento.nome,
            createdAt: elemento.createdAt
        }));
    }
    async listarId(id) {
        let resposta = await this.repository.listarId(id);
        if (!resposta) {
            throw new Error("Usuário nao encontrado.");
        }
        return {
            id: resposta.id,
            email: resposta.email,
            nome: resposta.nome,
            createdAt: resposta.createdAt
        };
    }
    async atualizar(id, data) {
        let resposta = await this.repository.listarId(id);
        if (!resposta) {
            throw new Error("Usuario não existe.");
        }
        const dados = {
            nome: data.nome ?? resposta.nome,
            email: data.email ?? resposta.email,
            senha: data.senha ?? resposta.senha
        };
        const update = await this.repository.atualizar(id, dados);
        return {
            id: update.id,
            email: update.email,
            nome: update.nome,
            createdAt: update.createdAt
        };
    }
    async deletar(id) {
        const resposta = await this.repository.deletar(id);
        if (resposta == 0) {
            throw new Error("Instituição não existe.");
        }
        return resposta;
    }
}
exports.ServiceInstituicao = ServiceInstituicao;
