import { IServiceInstituicao } from "../interfaces/Instituicao/InstituicaoService";
import { ServiceInstituicao } from "../services/ServiceInstituicao";
import { LoginInstituicaoDTO, CreateInstituicaoDTO } from "../models/dto.instituicao";
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
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    };

    public cadastrar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let user: CreateInstituicaoDTO = req.body;
            const resposta = await this.serviceIntituicao.cadastrar(user);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    };

    public listar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resposta = await this.serviceIntituicao.listar();
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    };

    public listaID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.serviceIntituicao.listarId(id);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.serviceIntituicao.atualizar(id, req.body);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = Number(req.params.id)
            const resposta = await this.serviceIntituicao.deletar(id);
            res.status(200).json(resposta);
        } catch (error) {
            next(error)
        }
    };
}