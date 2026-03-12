import { CreateAluno, ResponseAluno, UpdateAluno } from "../models/dto.aluno";
import { RepositoryAluno } from "../repositories/RepositoryAluno";
import { InstituicaoRepository } from "../repositories/RepositoryInstituicao";
import { IIRepositoryInstituicao } from "../interfaces/Instituicao/InstituicaoRepository";
import { IAlunoRepository } from "../interfaces/IAluno/IAlunoRepository";
import { IAlunoService } from "../interfaces/IAluno/IAlunoService";

class ServiceAluno implements IAlunoService {

    private repositoryAluno: IAlunoRepository;
    private respositoryIntituicao: IIRepositoryInstituicao;

    constructor(repositoryAluno?: IAlunoRepository, respositoryIntituicao?: IIRepositoryInstituicao) {
        this.repositoryAluno = repositoryAluno ?? new RepositoryAluno();
        this.respositoryIntituicao = respositoryIntituicao ?? new InstituicaoRepository();
    }

    public async cadastrarAluno(data: CreateAluno): Promise<ResponseAluno> {
        const existe = await this.respositoryIntituicao.listarId(data.instituicaoID);

        if (!existe) {
            throw new Error("Intituição não existe.");
        }

        let aluno: CreateAluno;
        aluno = {
            nome: data.nome,
            turma: data.turma,
            instituicaoID: data.instituicaoID
        }


        const dados: ResponseAluno | null = await this.repositoryAluno.cadastrarAluno(aluno);
        if (!dados) {
            throw new Error("Não foi possivel cadastrar aluno.");
        }
        return dados;
    }

    public async listarAlunoId(id: number): Promise<ResponseAluno | null> {
        const resposta = await this.repositoryAluno.listarAlunoId(id);
        if (!resposta) {
            throw new Error("Aluno não encontrado.");
        }

        return resposta;
    }

    public async listarAlunos(): Promise<ResponseAluno[]> {
        const resposta = await this.repositoryAluno.listarAluno();
        return resposta;
    }

    public async atualizarAluno(id: number, data: UpdateAluno): Promise<ResponseAluno> {
        const existe = await this.repositoryAluno.listarAlunoId(id);

        if (!existe) {
            throw new Error("Aluno não encontrado.");
        }

        if (!existe.instituicaoID) {
            throw new Error("Instituição não encontrada.");
        }

        const resposta = await this.repositoryAluno.atualizarCadastro(id, {
            nome: data.nome ?? existe.nome,
            turma: data.turma ?? existe.turma,
            instituicaoID: data.instituicaoID ?? existe.instituicaoID
        });

        return resposta;
    }
    public async delete(id: number): Promise<number> {
        const resposta = await this.repositoryAluno.deleteCadastro(id);
        if (resposta == 0) {
            throw new Error("Não foi possivel apagar este livro.");
        }

        return resposta;
    }
}