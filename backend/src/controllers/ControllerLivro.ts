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
            const livro: CreateLivro = req.body;
            const resposta = await this.livroservice.cadastrarLivro(livro);
            res.status(200).json({
                sucesso:true,
                dados: resposta,
                mensagem: "Livro cadastrado com sucesso."
            });
        } catch (error) {
            next(error)
        }
    }

    public listarId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id)
            const resposta = await this.livroservice.listarId(id);
            res.status(200).json({
                dados: resposta,
                mensagem: "Livro encontrado com sucesso"
            });
        } catch (error) {
            next(error)
        }
    }

    public listaLivrosInstituicao = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                throw new Error("ID inváldo.")
            }
            const resposta = await this.livroservice.listaLivrosInstituicao(id);
            res.status(200).json({
                sucesso:true,
                dados: resposta,
                mensagem: "Livros listados com sucesso"
            });
        } catch (error) {
            next(error);
        }
    }

    public listarTodos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resposta = await this.livroservice.listarTodos();
            res.status(200).json({
                dados: resposta,
                mensagem: "Livros listados com sucesso"
            });
        } catch (error) {
            next(error);
        }
    }

    public atualizarLivro = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                throw new Error("ID inváldo.")
            }
            const resposta = await this.livroservice.atualizarLivro(id, req.body);
            res.status(200).json({
                sucesso:true,
                dados: resposta,
                mensagem: "Livro atualizado com sucesso."
            });
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

           const resposta = await this.livroservice.delete(id);
            res.status(200).json({
                dados:resposta,
                mensagem:"Livro apagado com sucesso.",
                sucesso:true
            });
        } catch (error) {
            next(error)
        }
    }
}