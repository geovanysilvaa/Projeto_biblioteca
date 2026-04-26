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

        const emprestimoCriado = await this.repositoryemprestimo.cadastrarEmprestimo({
            alunoID: data.alunoID,
            livroID: data.livroID,
            instituicaoID: data.instituicaoID,
            data_devolucao: data.data_devolucao
        });

        if (!emprestimoCriado) {
            throw new Error("Não foi possivel faser emprestimo.");
        } else {
            await this.respositorylivro.atualizarLivro(existeLivro.id, {
                quantidade: existeLivro.quantidade - 1,
                nome: existeLivro.nome,
                autor: existeLivro.autor,
                ano: existeLivro.ano,
                categoria: existeLivro.categoria,
                instituicaoID: existeLivro.instituicaoID
            });
        }


        return emprestimoCriado;

    }

    public async listarEmprestimoId(id: number): Promise<ResponseEmprestimo> {
        const existeEmprestimo = await this.repositoryemprestimo.listarId(id);

        if (!existeEmprestimo) {
            throw new Error("Emprestimo não existe");
        }

        return existeEmprestimo;
    }

    public async listarEmprestimos(): Promise<ResponseEmprestimo[]> {
        const resposta = await this.repositoryemprestimo.listarTodos();

        return resposta;
    }

    public async atualizarEmprestimo(id: number, data: UpdateEmprestimo): Promise<ResponseEmprestimo> {
        const existeEmprestimo = await this.repositoryemprestimo.listarId(id);
        if (!existeEmprestimo) {
            throw new Error("Emprestimo não existe.");
        }

        if (data.instituicaoID) {
            const existeInstituicao = await this.repositoryinstituicao.listarId(data.instituicaoID);

            if (!existeInstituicao) {
                throw new Error("Instituição não encontrada.");
            }
        }

        if (data.alunoID) {
            const existeAluno = await this.respositoryaluno.listarAlunoId(data.alunoID);

            if (!existeAluno) {
                throw new Error("Aluno não encontrada.");
            }
        }

        if (data.livroID) {
            const existeLivro = await this.respositorylivro.listaLivrosId(data.livroID);

            if (!existeLivro) {
                throw new Error("Livro não encontrada.");
            }
        }

        const updateEmprestimo = await this.repositoryemprestimo.atualizarEmprestimo(id, {
            data_devolucao: data.data_devolucao ?? existeEmprestimo.data_devolucao,
            instituicaoID: data.instituicaoID ?? existeEmprestimo.instituicaoID,
            livroID: data.livroID ?? existeEmprestimo.livroID,
            alunoID: data.alunoID ?? existeEmprestimo.alunoID
        })

        return updateEmprestimo;
    }

    public async delete(id: number): Promise<number> {
        const existeEmprestimo = await this.repositoryemprestimo.listarId(id);

        if (!existeEmprestimo) {
            throw new Error("Emprestimo não existe.");
        }

        const resposta = await this.repositoryemprestimo.delete(id);

        if (resposta == 0) {
            throw new Error("Não foi possivel apagar este livro.");
        }
        return resposta;
    }
}