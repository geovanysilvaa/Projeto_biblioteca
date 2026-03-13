"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryEmprestimo = void 0;
const prisma_1 = require("../lib/prisma");
class RepositoryEmprestimo {
    async cadastrarEmprestimo(data) {
        const resposta = await prisma_1.prisma.$queryRaw `
        
        INSERT INTO "Emprestimo" ( data_devolucao,  "instituicaoID", "livroID" ,"alunoID") 
        VALUES(
        ${data.data_devolucao},
        ${data.instituicaoID},
        ${data.livroID},
        ${data.alunoID}
        ) 
        RETURNING id, data_emprestimo, data_devolucao,  "instituicaoID", "livroID", "alunoID";
    `;
        return resposta[0] ?? null;
    }
    async listarTodos() {
        const resposta = await prisma_1.prisma.$queryRaw `
        
        SELECT id, data_emprestimo, data_devolucao,  "instituicaoID", "livroID", "alunoID" 
        FROM "Emprestimo";
    `;
        return resposta;
    }
    async listarId(id) {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id, data_emprestimo, data_devolucao,  "instituicaoID", "livroID", "alunoID" 
        FROM "Emprestimo"
        WHERE id = ${id}
    `;
        return resposta[0] ?? null;
    }
    async atualizarEmprestimo(id, data) {
        const emprestimoAtual = await this.listarId(id);
        const updateData = {
            data_devolucao: data.data_devolucao ?? emprestimoAtual?.data_devolucao,
            instituicaoID: data.instituicaoID ?? emprestimoAtual?.instituicaoID,
            livroID: data.livroID ?? emprestimoAtual?.livroID,
            alunoID: data.alunoID ?? emprestimoAtual?.alunoID
        };
        const resposta = await prisma_1.prisma.$queryRaw `

        UPDATE "Emprestimo"
        SET data_devolucao = ${updateData.data_devolucao},
        "instituicaoID" = ${updateData.instituicaoID},
        "livroID" = ${updateData.livroID},
        "alunoID" = ${updateData.alunoID}
        WHERE id = ${id}
        RETURNING id, data_emprestimo, data_devolucao,  "instituicaoID", "livroID", "alunoID";
    `;
        return resposta[0];
    }
    async delete(id) {
        const resposta = await prisma_1.prisma.$executeRaw `

        DELETE 
        FROM "Emprestimo" 
        WHERE id = ${id}
    `;
        return resposta;
    }
}
exports.RepositoryEmprestimo = RepositoryEmprestimo;
