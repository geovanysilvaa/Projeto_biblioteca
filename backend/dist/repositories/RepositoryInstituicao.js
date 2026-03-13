"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoRepository = void 0;
const prisma_1 = require("../lib/prisma");
/*Testado*/
class InstituicaoRepository {
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
        const instituicaoAtual = await this.listarId(id);
        const updateData = {
            nome: data.nome ?? instituicaoAtual?.nome,
            senha: data.senha ?? instituicaoAtual?.senha,
            email: data.email ?? instituicaoAtual?.email
        };
        const resposta = await prisma_1.prisma.$queryRaw `

        UPDATE "Instituicao"
        SET nome = ${updateData.nome},
        email = ${updateData.email},
        senha = ${updateData.senha}
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
