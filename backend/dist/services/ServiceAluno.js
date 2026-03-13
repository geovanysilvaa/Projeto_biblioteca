"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceAluno = void 0;
const RepositoryAluno_1 = require("../repositories/RepositoryAluno");
const RepositoryInstituicao_1 = require("../repositories/RepositoryInstituicao");
class ServiceAluno {
    constructor(repositoryAluno, respositoryInstituicao) {
        this.repositoryAluno = repositoryAluno ?? new RepositoryAluno_1.RepositoryAluno();
        this.respositoryInstituicao = respositoryInstituicao ?? new RepositoryInstituicao_1.InstituicaoRepository();
    }
    async cadastrarAluno(data) {
        const existe = await this.respositoryInstituicao.listarId(data.instituicaoID);
        if (!existe) {
            throw new Error("Intituição não existe.");
        }
        let aluno;
        aluno = {
            nome: data.nome,
            turma: data.turma,
            instituicaoID: data.instituicaoID
        };
        const dados = await this.repositoryAluno.cadastrarAluno(aluno);
        if (!dados) {
            throw new Error("Não foi possivel cadastrar aluno.");
        }
        return dados;
    }
    async listarAlunoId(id) {
        const resposta = await this.repositoryAluno.listarAlunoId(id);
        if (!resposta) {
            throw new Error("Aluno não encontrado.");
        }
        return resposta;
    }
    async listarAlunos() {
        const resposta = await this.repositoryAluno.listarAluno();
        return resposta;
    }
    async atualizarAluno(id, data) {
        const existe = await this.repositoryAluno.listarAlunoId(id);
        if (!existe) {
            throw new Error("Aluno não encontrado.");
        }
        if (data.instituicaoID) {
            const existeInstituicao = await this.respositoryInstituicao.listarId(data.instituicaoID);
            if (!existeInstituicao) {
                throw new Error("Instituição não encontrada.");
            }
        }
        const resposta = await this.repositoryAluno.atualizarCadastro(id, {
            nome: data.nome ?? existe.nome,
            turma: data.turma ?? existe.turma,
            instituicaoID: data.instituicaoID ?? existe.instituicaoID
        });
        return resposta;
    }
    async delete(id) {
        const existeAluno = await this.repositoryAluno.listarAlunoId(id);
        if (!existeAluno) {
            throw new Error("Aluno não encontrodo.");
        }
        const resposta = await this.repositoryAluno.deleteCadastro(id);
        if (resposta == 0) {
            throw new Error("Não foi possivel apagar este livro.");
        }
        return resposta;
    }
}
exports.ServiceAluno = ServiceAluno;
