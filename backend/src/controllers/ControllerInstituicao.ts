import { IServiceInstituicao } from "../interfaces/Instituicao/InstituicaoService";
import { ServiceInstituicao } from "../services/ServiceInstituicao";
import { LoginInstituicaoDTO, CreateInstituicaoDTO, UpdateInstituicaoDTO } from "../models/dto.instituicao";
import { Response, NextFunction, Request } from "express";

/*Testado*/
export class InstituicaoController {

    private serviceIntituicao: IServiceInstituicao;

    constructor(serviceInstituicao?: IServiceInstituicao) {
        this.serviceIntituicao = serviceInstituicao ?? new ServiceInstituicao();
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let user: LoginInstituicaoDTO = req.body;
            const resposta = await this.serviceIntituicao.login(user);

            res.status(200).json({
                mensagem: "Login realizado com sucesso.",
                dados: resposta,
                sucesso:true
            });
        } catch (error) {
            next(error)
        }
    };

    public cadastrar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let user: CreateInstituicaoDTO = req.body;
            const resposta = await this.serviceIntituicao.cadastrar(user);

            res.status(201).json({
                mensagem: "Instituição cadastrada com sucesso",
                dados: resposta,
                sucesso:true
            });
        } catch (error) {
            next(error)
        }
    };

    public listar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resposta = await this.serviceIntituicao.listar();

            res.status(200).json({
                mensagem: "Instituições listadas com sucesso",
                dados: resposta,
                sucesso:true
            });
        } catch (error) {
            next(error)
        }
    };

    public listaID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new Error("ID inválido");
            }
            const resposta = await this.serviceIntituicao.listarId(id);

            res.status(200).json({
                mensagem: "Instituição encontrada com sucesso",
                dados: resposta,
                sucesso:true
            });
        } catch (error) {
            next(error)
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new Error("ID inválido");
            }
            let data: UpdateInstituicaoDTO = req.body;
            const resposta = await this.serviceIntituicao.atualizar(id, data);

            res.status(200).json({
                mensagem: "Instituição atualizada com sucesso",
                dados: resposta,
                sucesso:true
            });
        } catch (error) {
            next(error)
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new Error("ID inválido");
            }
            const resposta = await this.serviceIntituicao.deletar(id);
            res.status(200).json({
                mensagem: "Instituição apagada com sucesso",
                dados: resposta,
                sucesso:true
            });
        } catch (error) {
            next(error)
        }
    };
}