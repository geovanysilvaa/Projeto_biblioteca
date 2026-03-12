/*import dtos*/
import { CreateEmprestimo, ResponseEmprestimo, UpdateEmprestimo } from "../models/dto.emprestimo";

/*import interfaces*/
import { IEmprestimoService } from "../interfaces/IEmprestimo/IEmprestimoService";
import { IRepositoryEmprestimo } from "../interfaces/IEmprestimo/IEmprestimoRepository";
import { IIRepositoryInstituicao } from "../interfaces/Instituicao/InstituicaoRepository";
import { IlivroRepository } from "../interfaces/Ilivro/ILivroRepository";
import { IAlunoRepository } from "../interfaces/IAluno/IAlunoRepository";

/*import repository*/
import { RepositoryEmprestimo } from "../repositories/RepositoryEmprestimo";
import { InstituicaoRepository } from "../repositories/RepositoryInstituicao";
import { RespositoryLivro } from "../repositories/RepositoryLivro";
import { RepositoryAluno } from "../repositories/RepositoryAluno";


export class ServiceEmprestimo implements IEmprestimoService {

    private repositoryemprestimo: IRepositoryEmprestimo;
    private repositoryinstituicao: IIRepositoryInstituicao;
    private respositorylivro: IlivroRepository;
    private respositoryaluno: IAlunoRepository;

    constructor(repositoryemprestimo?: IRepositoryEmprestimo, repositoryinstituicao?: IIRepositoryInstituicao, respositorylivro?: IlivroRepository, respositoryaluno?: IAlunoRepository) {

        this.repositoryemprestimo = repositoryemprestimo ?? new RepositoryEmprestimo();
        this.repositoryinstituicao = repositoryinstituicao ?? new InstituicaoRepository();
        this.respositorylivro = respositorylivro ?? new RespositoryLivro();
        this.respositoryaluno = respositoryaluno ?? new RepositoryAluno();
    }

   public async novoEmprestimo(data: CreateEmprestimo): Promise<ResponseEmprestimo> {
        const existeInstituicao = await this.repositoryinstituicao.listarId(data.instituicaoID);
        const existeLivro = await this.respositorylivro.listaLivrosId(data.livroID);
        const existeAluno = await this.respositoryaluno.listarAlunoId(data.alunoID);

        if (!existeInstituicao) {
            throw new Error("Instituição não encontrada.");
        }
        if (!existeLivro) {
            throw new Error("Livro não encontrada.");
        }
        if (!existeAluno) {
            throw new Error("Aluno não encontrado.");
        }
        if (existeLivro.quantidade < 1) {
            throw new Error("Livro indisponível.");
        }

        await this.respositorylivro.atualizarLivro(existeLivro.id, {
            quantidade: existeLivro.quantidade - 1,
            nome: existeLivro.nome,
            autor: existeLivro.autor,
            ano: existeLivro.ano,
            categoria: existeLivro.categoria,
            instituicaoID: existeLivro.instituicaoID
        });

        const emprestimoCriado = await this.repositoryemprestimo.cadastrarEmprestimo({
            alunoID: data.alunoID,
            livroID: data.livroID,
            instituicaoID: data.instituicaoID,
            data_emprestimo: data.data_emprestimo,
            data_devolucao : data.data_devolucao
        });

        if(!emprestimoCriado){
            throw new Error("Não foi possivel faser emprestimo.");
        }

        return emprestimoCriado;

    }

    async listarEmprestimoId(id: number): Promise<ResponseEmprestimo> {

    }

    async listarEmprestimos(): Promise<ResponseEmprestimo[]> {

    }

    async atualizarEmprestimo(data: UpdateEmprestimo): Promise<ResponseEmprestimo> {

    }

    async delete(id: number): Promise<number> {

    }
}