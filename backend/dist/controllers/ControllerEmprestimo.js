"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const ServiceEmprestimo_1 = require("../services/ServiceEmprestimo");
class EmprestimoController {
    constructor(emprestimoService) {
        this.novoEmprestimo = async (req, res, next) => {
            try {
                let emprestimo = req.body;
                const resposta = await this.emprestimoService.novoEmprestimo(emprestimo);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listarEmprestimoId = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.emprestimoService.listarEmprestimoId(id);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listarEmprestimos = async (req, res, next) => {
            try {
                let alunos = await this.emprestimoService.listarEmprestimos();
                res.status(200).json(alunos);
            }
            catch (error) {
                next(error);
            }
        };
        this.atualizarEmprestimo = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.emprestimoService.atualizarEmprestimo(id, req.body);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.emprestimoService.delete(id);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.emprestimoService = emprestimoService ?? new ServiceEmprestimo_1.ServiceEmprestimo();
    }
}
exports.EmprestimoController = EmprestimoController;
