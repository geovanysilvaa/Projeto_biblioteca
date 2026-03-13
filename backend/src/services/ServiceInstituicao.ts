import { CreateInstituicaoDTO, LoginInstituicaoDTO, ResponseInstituicaoDTO, UpdateInstituicaoDTO } from "../models/dto.instituicao";
import { IServiceInstituicao } from "../interfaces/Instituicao/InstituicaoService";
import { IIRepositoryInstituicao } from "../interfaces/Instituicao/InstituicaoRepository";
import { InstituicaoRepository } from "../repositories/RepositoryInstituicao";
import bcrypt from 'bcrypt';


/*Testado*/
export class ServiceInstituicao implements IServiceInstituicao {
    private repositoryinstituicao: IIRepositoryInstituicao;

    constructor(repositoryinstituicao?: IIRepositoryInstituicao) {
        this.repositoryinstituicao = repositoryinstituicao ?? new InstituicaoRepository();
    }

    public async login(data: LoginInstituicaoDTO): Promise<ResponseInstituicaoDTO> {
        const existe = await this.repositoryinstituicao.listarEmail(data.email);
  
        if (!existe) {
            throw new Error("Intituição não encontrado.");
        }

        const senhaSegura = await bcrypt.compare(data.senha, existe.senha);
   
        if (!senhaSegura) {
            throw new Error("Email ou senha incorretas.");
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

    public async cadastrar(data: CreateInstituicaoDTO): Promise<ResponseInstituicaoDTO> {
        const existe = await this.repositoryinstituicao.listarEmail(data.email);

        if (existe) {
            throw new Error("Email ja cadastrado.");
        }

        const senhaSegura = await bcrypt.hash(data.senha, 10);

        const dados: CreateInstituicaoDTO = {
            nome: data.nome,
            email: data.email,
            senha: senhaSegura
        }

        let resposta: ResponseInstituicaoDTO | null;

        resposta = await this.repositoryinstituicao.cadastrar(dados);
        if (!resposta) {
            throw new Error("Não foi possivel Cadastrar Instituição.");
        }

        resposta = {
            id: resposta.id,
            email: resposta.email,
            nome: resposta.nome,
            createdAt: resposta.createdAt
        }

        return resposta;
    }

    public async listar(): Promise<ResponseInstituicaoDTO[]> {
        let resposta = await this.repositoryinstituicao.listar();

        return resposta.map(elemento => ({
            id: elemento.id,
            email: elemento.email,
            nome: elemento.nome,
            createdAt: elemento.createdAt
        }));
    }

    public async listarId(id: number): Promise<ResponseInstituicaoDTO | null> {
        let resposta = await this.repositoryinstituicao.listarId(id);
        if (!resposta) {
             throw new Error("Intituição não encontrado.");
        }

        return {
            id: resposta.id,
            email: resposta.email,
            nome: resposta.nome,
            createdAt: resposta.createdAt
        };
    }

    public async atualizar(id: number, data: UpdateInstituicaoDTO): Promise<ResponseInstituicaoDTO> {
        const resposta = await this.repositoryinstituicao.listarId(id);
        if (!resposta) {
             throw new Error("Intituição não encontrado.");
        }

        const senhaSegura = await bcrypt.hash(resposta.senha,10);
        
        const update: ResponseInstituicaoDTO = await this.repositoryinstituicao.atualizar(id, {
            nome: data.nome ?? resposta.nome,
            email: data.email ?? resposta.email,
            senha: senhaSegura
        });

        return {
            id: update.id,
            email: update.email,
            nome: update.nome,
            createdAt: update.createdAt
        }
    }

    public async deletar(id: number): Promise<number> {
        const existeInstituicao = await this.repositoryinstituicao.listarId(id);
        if(!existeInstituicao){
           throw new Error("Intituição não encontrado.");  
        }
        const resposta = await this.repositoryinstituicao.deletar(id);

        if (resposta == 0) {
            throw new Error("Não foi possivel deletar.");
        }
        return resposta;
    }
}