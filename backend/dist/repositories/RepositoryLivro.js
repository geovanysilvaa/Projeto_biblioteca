"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespositoryLivro = void 0;
const prisma_1 = require("../lib/prisma");
/*Não testado*/
class RespositoryLivro {
    async cadastrarLivro(data) {
        const resposta = await prisma_1.prisma.$queryRaw `

        INSERT INTO "Livro" (nome, autor, ano, categoria, quantidade,  "instituicaoID")
        VALUES (
        ${data.nome},
        ${data.autor},
        ${data.ano},
        ${data.categoria},
        ${data.quantidade},
        ${data.instituicaoID}
        )
        RETURNING id, nome, autor, ano, categoria, quantidade, "instituicaoID";
    `;
        return resposta[0] ?? null;
    }
    async listaLivros() {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT id, nome, autor, ano, categoria, quantidade,  "instituicaoID"
        FROM "Livro"
    `;
        return resposta;
    }
    async listaLivrosId(id) {
        const resposta = await prisma_1.prisma.$queryRaw `

        SELECT  id, nome, autor, ano, categoria, quantidade, "instituicaoID" 
        FROM "Livro"
        WHERE id = ${id};
    `;
        return resposta[0] ?? null;
    }
    async atualizarLivro(id, data) {
        const livroAtual = await this.listaLivrosId(id);
        const updateData = {
            nome: data.nome ?? livroAtual?.nome,
            autor: data.autor ?? livroAtual?.autor,
            ano: data.ano ?? livroAtual?.ano,
            quantidade: data.quantidade ?? livroAtual?.quantidade,
            categoria: data.categoria ?? livroAtual?.categoria,
            instituicaoID: data.instituicaoID ?? livroAtual?.instituicaoID
        };
        const resposta = await prisma_1.prisma.$queryRaw `

        UPDATE "Livro"
        SET nome = ${updateData.nome},
        autor = ${updateData.autor},
        ano = ${updateData.ano},
        quantidade = ${updateData.quantidade},  
        categoria = ${updateData.categoria},
        "instituicaoID" = ${updateData.instituicaoID}
        WHERE id = ${id}
        RETURNING id, nome, autor, ano, quantidade, categoria,  "instituicaoID";
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
exports.RespositoryLivro = RespositoryLivro;
