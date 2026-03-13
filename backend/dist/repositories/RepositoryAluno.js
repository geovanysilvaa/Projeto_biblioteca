"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryAluno = void 0;
const prisma_1 = require("../lib/prisma");
class RepositoryAluno {
    async cadastrarAluno(data) {
        const resposta = await prisma_1.prisma.$queryRaw `

        INSERT INTO "Aluno" (nome, turma, "instituicaoID")
        VALUES(
        ${data.nome},
        ${data.turma},
        ${data.instituicaoID}
        )
        RETURNING id, nome, turma, "instituicaoID";
    `;
        return resposta[0] ?? null;
    }
    async listarAluno() {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id, nome, turma, "instituicaoID" 
        FROM "Aluno";
    `;
        return resposta;
    }
    async listarAlunoId(id) {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id, nome, turma, "instituicaoID" 
        FROM "Aluno"
        WHERE id = ${id}
    `;
        return resposta[0] ?? null;
    }
    async atualizarCadastro(id, data) {
        const alunoAtual = await this.listarAlunoId(id);
        const updateData = {
            nome: data.nome ?? alunoAtual?.nome,
            turma: data.turma ?? alunoAtual?.turma,
            instituicaoID: data.instituicaoID ?? alunoAtual?.instituicaoID
        };
        const resposta = await prisma_1.prisma.$queryRaw `

        UPDATE "Aluno"
        SET nome = ${updateData.nome},
        turma = ${updateData.turma},
        "instituicaoID" = ${updateData.instituicaoID} 
        WHERE id = ${id}
        RETURNING id, nome, turma, "instituicaoID";
     `;
        return resposta[0];
    }
    async deleteCadastro(id) {
        const resposta = await prisma_1.prisma.$executeRaw `

        DELETE 
        FROM"Aluno" 
        WHERE id = ${id}
    `;
        return resposta;
    }
}
exports.RepositoryAluno = RepositoryAluno;
