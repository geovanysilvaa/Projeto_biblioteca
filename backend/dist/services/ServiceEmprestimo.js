"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEmprestimo = void 0;
/*import repository*/
const RepositoryEmprestimo_1 = require("../repositories/RepositoryEmprestimo");
const RepositoryInstituicao_1 = require("../repositories/RepositoryInstituicao");
const RepositoryLivro_1 = require("../repositories/RepositoryLivro");
const RepositoryAluno_1 = require("../repositories/RepositoryAluno");
class ServiceEmprestimo {
    constructor(repositoryemprestimo, repositoryinstituicao, respositorylivro, respositoryaluno) {
        this.repositoryemprestimo = repositoryemprestimo ?? new RepositoryEmprestimo_1.RepositoryEmprestimo();
        this.repositoryinstituicao = repositoryinstituicao ?? new RepositoryInstituicao_1.InstituicaoRepository();
        this.respositorylivro = respositorylivro ?? new RepositoryLivro_1.RespositoryLivro();
        this.respositoryaluno = respositoryaluno ?? new RepositoryAluno_1.RepositoryAluno();
    }
    async novoEmprestimo(data) {
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
        }
        else {
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
    async listarEmprestimoId(id) {
        const existeEmprestimo = await this.repositoryemprestimo.listarId(id);
        if (!existeEmprestimo) {
            throw new Error("Emprestimo não existe");
        }
        return existeEmprestimo;
    }
    async listarEmprestimos() {
        const resposta = await this.repositoryemprestimo.listarTodos();
        return resposta;
    }
    async atualizarEmprestimo(id, data) {
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
        });
        return updateEmprestimo;
    }
    async delete(id) {
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
exports.ServiceEmprestimo = ServiceEmprestimo;
