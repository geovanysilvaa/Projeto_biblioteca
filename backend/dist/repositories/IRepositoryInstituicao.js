"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoRepository = void 0;
const prisma_1 = require("../lib/prisma");
/**
 * Clases responsavel pelo CRUD da Instituição.  (Já testado 100%)/(ainda falta ajustes)
 *
*/
class InstituicaoRepository {
    /**
     * Metodo cadastrar Instituição.
     * @param data - dados (Instituição)
     * @returns resposta com os campos (data)
    */
    async cadastrar(data) {
        const resposta = await prisma_1.prisma.$queryRaw `

        INSERT INTO "Instituicao" (nome, email, senha)
        VALUES (
        ${data.nome},
        ${data.email},
        ${data.senha}
        )
        RETURNING id, nome, email, "createdAt";
    `;
        return resposta[0] ?? null;
    }
    async listar() {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id,nome,senha, email, "createdAt" 
        FROM "Instituicao";
    `;
        return resposta;
    }
    async listarEmail(email) {
        const resposta = await prisma_1.prisma.$queryRaw `
        SELECT id, nome, email, senha, "createdAt"
        FROM "Instituicao"
        WHERE email = ${email};
    `;
        return resposta[0] ?? null;
    }
    async listarId(id) {
        const resposta = await prisma_1.prisma.$queryRaw `
        SELECT id, nome, email, senha, "createdAt"
        FROM "Instituicao"
        WHERE id = ${id};
    `;
        return resposta[0] ?? null;
    }
    async atualizar(id, data) {
        const resposta = await prisma_1.prisma.$queryRaw `

        UPDATE "Instituicao"
        SET nome = ${data.nome},
        email = ${data.email},
        senha = ${data.senha}
        WHERE id = ${id}
        RETURNING id, nome, email, senha, "createdAt";
     `;
        return resposta[0];
    }
    async deletar(id) {
        const resposta = await prisma_1.prisma.$executeRaw `
        DELETE 
        FROM "Instituicao" 
        WHERE id = ${id};
    `;
        return resposta;
    }
}
exports.InstituicaoRepository = InstituicaoRepository;
