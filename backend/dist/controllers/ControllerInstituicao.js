"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoController = void 0;
const ServiceInstituicao_1 = require("../services/ServiceInstituicao");
class InstituicaoController {
    constructor(serviceInstituicao) {
        this.login = async (req, res, next) => {
            try {
                let user = req.body;
                const resposta = await this.serviceIntituicao.login(user);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.cadastrar = async (req, res, next) => {
            try {
                let user = req.body;
                const resposta = await this.serviceIntituicao.cadastrar(user);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listar = async (req, res, next) => {
            try {
                const resposta = await this.serviceIntituicao.listar();
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listaID = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.serviceIntituicao.listarId(id);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.serviceIntituicao.atualizar(id, req.body);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.serviceIntituicao.deletar(id);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.serviceIntituicao = serviceInstituicao ?? new ServiceInstituicao_1.ServiceInstituicao();
    }
}
exports.InstituicaoController = InstituicaoController;
