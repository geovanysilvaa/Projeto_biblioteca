import { IAlunoService } from "../interfaces/IAluno/IAlunoService";
import { ServiceAluno } from "../services/ServiceAluno";
import { Response, NextFunction, Request } from "express";
import { CreateAluno } from "../models/dto.aluno";

export class AlunoController {

    private alunoService: IAlunoService;

    constructor(alunoService?: IAlunoService) {
        this.alunoService = alunoService ?? new ServiceAluno();
    }

    public cadastrarAluno = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let aluno: CreateAluno = req.body;
            const resposta = await this.alunoService.cadastrarAluno(aluno);
            res.status(200).json({
                sucesso:true,
                dados:resposta,
                mensagem:"Aluno cadastrado com sucesso."
            });
        } catch (error) {
            next(error)
        }
    }

    public listarAlunoId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            if(isNaN(id)){
                throw new Error("ID inválido")
            }
            const resposta = await this.alunoService.listarAlunoId(id);
            res.status(200).json({
                sucesso:true,
                dados:resposta,
                mensagem:"Aluno encontrada com sucesso"
            });
        } catch (error) {
            next(error)
        }
    }

    public listarAlunos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const alunos = await this.alunoService.listarAlunos();
            res.status(200).json({
                sucesso:true,
                dados:alunos,
                mensagem:"Alunos listados com sucesso."
            });
        } catch (error) {
            next(error);
        }
    }

    public atualizarAluno = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)){
                throw new Error("ID inválido.")
            }
            const resposta = await this.alunoService.atualizarAluno(id, req.body);
            res.status(200).json({
                sucesso:true,
                dados:resposta,
                mensagem:"Aluno atualizado com sucesso."
            });
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)){
                throw new Error("ID inválido.")
            }
            const resposta = await this.alunoService.delete(id);
            res.status(200).json({
                sucesso:true,
                dados:resposta,
                mensagem:"Aluno apagado com sucesso."
            });
        } catch (error) {
            next(error)
        }
    }
}