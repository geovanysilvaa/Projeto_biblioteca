"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const ServiceLivro_1 = require("../services/ServiceLivro");
class LivroController {
    constructor(livroservice) {
        this.cadastrarLivro = async (req, res, next) => {
            try {
                let livro = req.body;
                const resposta = await this.livroservice.cadastrarLivro(livro);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listarId = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.livroservice.listarId(id);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listarTodos = async (req, res, next) => {
            try {
                let alunos = await this.livroservice.listarTodos();
                res.status(200).json(alunos);
            }
            catch (error) {
                next(error);
            }
        };
        this.atualizarLivro = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.livroservice.atualizarLivro(id, req.body);
                res.status(200).json(resposta);
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
                await this.livroservice.delete(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.livroservice = livroservice ?? new ServiceLivro_1.ServiceLivro();
    }
}
exports.LivroController = LivroController;
