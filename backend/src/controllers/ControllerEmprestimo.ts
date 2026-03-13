import { IEmprestimoService } from "../interfaces/IEmprestimo/IEmprestimoService";
import { ServiceEmprestimo } from "../services/ServiceEmprestimo";
import { Response, NextFunction, Request } from "express";
import { CreateEmprestimo } from "../models/dto.emprestimo";

export class EmprestimoController {

    private emprestimoService: IEmprestimoService;

    constructor(emprestimoService?: IEmprestimoService) {
        this.emprestimoService = emprestimoService ?? new ServiceEmprestimo();
    }

    public novoEmprestimo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let emprestimo: CreateEmprestimo = req.body;
            const resposta = await this.emprestimoService.novoEmprestimo(emprestimo);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    }

    public listarEmprestimoId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.emprestimoService.listarEmprestimoId(id);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    }

    public listarEmprestimos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let alunos = await this.emprestimoService.listarEmprestimos();
            res.status(200).json(alunos);
        } catch (error) {
            next(error);
        }
    }

    public atualizarEmprestimo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.emprestimoService.atualizarEmprestimo(id, req.body);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.emprestimoService.delete(id);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    }
}