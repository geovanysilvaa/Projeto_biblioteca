"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryAluno = void 0;
const prisma_1 = require("../lib/prisma");
class RepositoryAluno {
    async cadastrarAluno(data) {
        const resposta = await prisma_1.prisma.$queryRaw `

        INSERT INTO "Aluno" (nome, turma, instituicaoID)
        VALUES(
        ${data.nome},
        ${data.turma},
        ${data.instituicaoID}
        )
        RETURNING id, nome, turma, instituicaoID;
    `;
        return resposta[0] ?? null;
    }
    async listarAluno() {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id, nome, turma, instituicaoID 
        FROM "Aluno";
    `;
        return resposta;
    }
    async listarAlunoID(id) {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id, nome turma, instituicaoID 
        FROM "Aluno"
        WHERE id = ${id}
    `;
        return resposta[0] ?? null;
    }
    async atualizarCadastro(id, data) {
        const resposta = await prisma_1.prisma.$queryRaw `

        UPDATE "Aluno"
        SET nome = ${data.nome},
        turma = ${data.turma},
        instituicaoID = ${data.instituicaoID} /*atualiza so se id existir*/
        WHERE id = ${id}
        RETURNING id, nome, turma, instituicaoID;
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
