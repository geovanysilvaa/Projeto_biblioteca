import { CreateLivro, ResponseLivro, UpdateLivro } from "../models/dto.livro";

import { IIRepositoryInstituicao } from "../interfaces/Instituicao/InstituicaoRepository";
import { InstituicaoRepository } from "../repositories/RepositoryInstituicao";

import { RespositoryLivro } from "../repositories/RepositoryLivro";
import { IlivroRepository } from "../interfaces/Ilivro/ILivroRepository";

import { IServiceLivro } from "../interfaces/Ilivro/ILivroService";


export class ServiceLivro implements IServiceLivro {

    private repositoryinstituicao: IIRepositoryInstituicao;
    private repositorylivro: IlivroRepository;

    constructor(repositoryinstituicao?: IIRepositoryInstituicao, repositorylivro?: IlivroRepository) {
        this.repositoryinstituicao = repositoryinstituicao ?? new InstituicaoRepository();
        this.repositorylivro = repositorylivro ?? new RespositoryLivro();
    }

    public async cadastrarLivro(data: CreateLivro): Promise<ResponseLivro> {
        const existeInstituicao = await this.repositoryinstituicao.listarId(data.instituicaoID);
        if (!existeInstituicao) {
            throw new Error("Instuição não existe.");
        }

        let dados: CreateLivro;

        dados = {
            nome: data.nome,
            autor: data.autor,
            ano: data.ano,
            categoria: data.categoria,
            quantidade: data.quantidade,
            instituicaoID: data.instituicaoID
        }

        const resposta = await this.repositorylivro.cadastrarLivro(dados);
        if (!resposta) {
            throw new Error("Não foi possivel cadastrar livro.");
        }
        return resposta;

    }

    public async listarTodos(): Promise<ResponseLivro[]> {
        const resposta = await this.repositorylivro.listaLivros();
        return resposta;
    }

    public async listarId(id: number): Promise<ResponseLivro> {
        const existe = await this.repositorylivro.listaLivrosId(id);
        if (!existe) {
            throw new Error("Este livro não existe.");
        }

        return existe;
    }

    public async atualizarLivro(id: number, data: UpdateLivro): Promise<ResponseLivro> {
        const existe = await this.repositorylivro.listaLivrosId(id);
        if (!existe) {
            throw new Error("Livro não existe");
        }

        let dados = {
            nome: data.nome ?? existe.nome,
            autor: data.autor ?? existe.autor,
            ano: data.ano ?? existe.ano,
            quantidade: data.quantidade ?? existe.quantidade,
            categoria: data.categoria ?? existe.categoria,
            instituicaoID: data.instituicaoID ?? existe.instituicaoID
        }

        const resposta: ResponseLivro = await this.repositorylivro.atualizarLivro(id, dados);

        return {
            id: resposta.id,
            nome: resposta.nome,
            autor: resposta.autor,
            ano: resposta.ano,
            categoria: resposta.categoria,
            quantidade: resposta.quantidade,
            instituicaoID: resposta.instituicaoID
        }
    }

    public async delete(id: number): Promise<number> {
        const exiteLivro = this.repositorylivro.listaLivrosId(id);
        if (!exiteLivro) {
            throw new Error("Livro não existe.")
        }

        const resposta = await this.repositorylivro.deleteLivro(id);
        if (resposta == 0) {
            throw new Error("Não foi possivel apagar este livro.");
        }

        return resposta;
    }
}