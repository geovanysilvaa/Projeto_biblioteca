"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoController = void 0;
const ServiceAluno_1 = require("../services/ServiceAluno");
class AlunoController {
    constructor(alunoService) {
        this.cadastrarAluno = async (req, res, next) => {
            try {
                let aluno = req.body;
                const resposta = await this.alunoService.cadastrarAluno(aluno);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listarAlunoId = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.alunoService.listarAlunoId(id);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.listarAlunos = async (req, res, next) => {
            try {
                let alunos = await this.alunoService.listarAlunos();
                res.status(200).json(alunos);
            }
            catch (error) {
                next(error);
            }
        };
        this.atualizarAluno = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.alunoService.atualizarAluno(id, req.body);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                let id = Number(req.params.id);
                const resposta = await this.alunoService.delete(id);
                res.status(200).json(resposta);
            }
            catch (error) {
                next(error);
            }
        };
        this.alunoService = alunoService ?? new ServiceAluno_1.ServiceAluno();
    }
}
exports.AlunoController = AlunoController;
