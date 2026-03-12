"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
/*Não testado*/
class IRespositoryLivro {
    async cadastrarLivro(data) {
        const resposta = await prisma_1.prisma.$queryRaw `

        INSERT INTO "Livro" (nome, autor, ano, categoria, quantidade, instituicaoID)
        VALUES (
        ${data.nome},
        ${data.autor},
        ${data.ano},
        ${data.categoria},
        ${data.quantidade},
        ${data.instituicaoID}
        )
        RETURNING id, nome, autor, ano, categoria, quantidade, instituicaoID;
    `;
        return resposta[0] ?? null;
    }
    async listaLivros() {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id, nome, autor, ano, categoria, quantidade, instituicaoID 
        FROM "Livro"
    `;
        return resposta;
    }
    async listaLivrosID(id) {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT  id, nome, autor, ano, categoria, quantidade,instituicaoID 
        FROM "Livro"
        WHERE id = ${id};
    `;
        return resposta[0] ?? null;
    }
    async atualizarLivro(id, data) {
        const resposta = await prisma_1.prisma.$queryRaw `
        UPDATE "Livro"
        SET nome = ${data.nome},
        autor = ${data.autor},
        ano = ${data.ano},
        quantidade = ${data.quantidade},  
        categoria = ${data.categoria}
        WHERE id = ${id}
        RETURNING nome, autor, ano, quantidade, categoria;
    `;
        return resposta[0];
    }
    async deleteLivro(id) {
        const resposta = await prisma_1.prisma.$executeRaw `

        DELETE 
        FROM "Livro" 
        WHERE id = ${id}
    `;
        return resposta;
    }
}
