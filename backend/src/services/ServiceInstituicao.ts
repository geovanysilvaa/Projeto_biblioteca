import { CreateInstituicaoDTO, LoginInstituicaoDTO, ResponseInstituicaoDTO, UpdateInstituicaoDTO } from "../models/dto.instituicao";
import { IServiceInstituicao } from "../interfaces/Instituicao/InstituicaoService";
import { IIRepositoryInstituicao } from "../interfaces/Instituicao/InstituicaoRepository";
import { InstituicaoRepository } from "../repositories/IRepositoryInstituicao";

export class ServiceInstituicao implements IServiceInstituicao {
    private repository: IIRepositoryInstituicao;

    constructor(repository?: IIRepositoryInstituicao) {
        this.repository = repository ?? new InstituicaoRepository();
    }

    async login(data: LoginInstituicaoDTO): Promise<ResponseInstituicaoDTO> {
        const existe = await this.repository.listarEmail(data.email)
        if (!existe) {
            throw new Error("Usuario não encontrado");
        }


        if(existe.senha != data.senha){
            throw new Error("Senha ou email incorretas");
        }
        
        let response: ResponseInstituicaoDTO;
        response = {
            id: existe.id,
            email: existe.email,
            nome: existe.nome,
            createdAt: existe.createdAt
        }

        return response;
    }

    async cadastrar(data: CreateInstituicaoDTO): Promise<ResponseInstituicaoDTO> {
        let existe = await this.repository.listarEmail(data.email);

        if (existe) {
            throw new Error("Email ja cadastrado");
        }

        let resposta: ResponseInstituicaoDTO;
        resposta = await this.repository.cadastrar(data);

        resposta = {
            id: resposta.id,
            email: resposta.email,
            nome: resposta.nome,
            createdAt: resposta.createdAt
        }

        return resposta;
    }

    async listar(): Promise<ResponseInstituicaoDTO[]> {
        let resposta = await this.repository.listar();

        return resposta.map(elemento => ({
            id: elemento.id,
            email: elemento.email,
            nome: elemento.nome,
            createdAt: elemento.createdAt
        }));
    }

    async listarId(id: number): Promise<ResponseInstituicaoDTO | null> {
        let resposta = await this.repository.listarId(id);
        if (!resposta) {
            throw new Error("Usuário nao encontrado")
        }

        return {
            id: resposta.id,
            email: resposta.email,
            nome: resposta.nome,
            createdAt: resposta.createdAt
        };
    }

    async atualizar(id: number, data: UpdateInstituicaoDTO): Promise<ResponseInstituicaoDTO> {
        let resposta = await this.repository.listarId(id);
        if (!resposta) {
            throw new Error("Usuario não existe")
        }

        if (data.email) {
            const existe = await this.repository.listarEmail(data.email);
            if (existe && existe.id != id) {
                throw new Error("Email já cadastrado por outro usuário");
            }
        }

        let update: ResponseInstituicaoDTO = await this.repository.atualizar(id, data);
        return {
            id: update.id,
            email: update.email,
            nome: update.nome,
            createdAt: update.createdAt
        }
    }

    async deletar(id: number): Promise<void> {
        return this.repository.deletar(id);
    }
}