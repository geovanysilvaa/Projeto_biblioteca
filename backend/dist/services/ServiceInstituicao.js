"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceInstituicao = void 0;
const IRepositoryInstituicao_1 = require("../repositories/IRepositoryInstituicao");
class ServiceInstituicao {
    constructor(repository) {
        this.repository = repository ?? new IRepositoryInstituicao_1.InstituicaoRepository();
    }
    async login(data) {
        const existe = await this.repository.listarEmail(data.email);
        if (!existe) {
            throw new Error("Usuario não encontrado");
        }
        if (existe.senha != data.senha) {
            throw new Error("Senha ou email incorretas");
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
        let existe = await this.repository.listarEmail(data.email);
        if (existe) {
            throw new Error("Email ja cadastrado");
        }
        let resposta;
        resposta = await this.repository.cadastrar(data);
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
            throw new Error("Usuário nao encontrado");
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
            throw new Error("Usuario não existe");
        }
        if (data.email) {
            const existe = await this.repository.listarEmail(data.email);
            if (existe && existe.id != id) {
                throw new Error("Email já cadastrado por outro usuário");
            }
        }
        let update = await this.repository.atualizar(id, data);
        return {
            id: update.id,
            email: update.email,
            nome: update.nome,
            createdAt: update.createdAt
        };
    }
    async deletar(id) {
        return this.repository.deletar(id);
    }
}
exports.ServiceInstituicao = ServiceInstituicao;
