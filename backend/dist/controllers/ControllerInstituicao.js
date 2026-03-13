"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoController = void 0;
const ServiceInstituicao_1 = require("../services/ServiceInstituicao");
/*Testado*/
class InstituicaoController {
    constructor(serviceInstituicao) {
        this.login = async (req, res, next) => {
            try {
                let user = req.body;
                const resposta = await this.serviceIntituicao.login(user);
                res.status(200).json({
                    mensagem: "Login realizado com sucesso.",
                    dados: resposta
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.cadastrar = async (req, res, next) => {
            try {
                let user = req.body;
                const resposta = await this.serviceIntituicao.cadastrar(user);
                res.status(201).json({
                    mensagem: "Instituição cadastrada com sucesso",
                    dados: resposta
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.listar = async (req, res, next) => {
            try {
                const resposta = await this.serviceIntituicao.listar();
                res.status(200).json({
                    mensagem: "Instituições listadas com sucesso",
                    dados: resposta
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.listaID = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    throw new Error("ID inválido");
                }
                const resposta = await this.serviceIntituicao.listarId(id);
                res.status(200).json({
                    mensagem: "Instituição encontrada com sucesso",
                    dados: resposta
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    throw new Error("ID inválido");
                }
                let data = req.body;
                const resposta = await this.serviceIntituicao.atualizar(id, data);
                res.status(200).json({
                    mensagem: "Instituição atualizada com sucesso",
                    dados: resposta
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    throw new Error("ID inválido");
                }
                await this.serviceIntituicao.deletar(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.serviceIntituicao = serviceInstituicao ?? new ServiceInstituicao_1.ServiceInstituicao();
    }
}
exports.InstituicaoController = InstituicaoController;
