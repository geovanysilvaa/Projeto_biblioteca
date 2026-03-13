import { IServiceLivro } from "../interfaces/Ilivro/ILivroService";
import { ServiceLivro } from "../services/ServiceLivro";
import { Response, NextFunction, Request } from "express";
import { CreateLivro } from "../models/dto.livro";

export class LivroController {

    private livroservice: IServiceLivro;

    constructor(livroservice?: IServiceLivro) {
        this.livroservice = livroservice ?? new ServiceLivro();
    }

    public cadastrarLivro = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let livro: CreateLivro = req.body;
            const resposta = await this.livroservice.cadastrarLivro(livro);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    }

    public listarId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.livroservice.listarId(id);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    }

    public listarTodos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let alunos = await this.livroservice.listarTodos();
            res.status(200).json(alunos);
        } catch (error) {
            next(error);
        }
    }

    public atualizarLivro = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.livroservice.atualizarLivro(id, req.body);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new Error("ID inválido");
            }
            
            await this.livroservice.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}