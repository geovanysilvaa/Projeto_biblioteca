import { ResponseLivro, CreateLivro, UpdateLivro, UpdateResponseLivro } from "../models/dto.livro";
import { IlivroRepository } from "../interfaces/Ilivro/ILivroRepository";
import { prisma } from "../lib/prisma";


/*Não testado*/
export class RespositoryLivro implements IlivroRepository {

    public async cadastrarLivro(data: CreateLivro): Promise<ResponseLivro | null> {
        const resposta = await prisma.$queryRaw<ResponseLivro[]>`

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

    public async listaLivros(): Promise<ResponseLivro[]> {
        const resposta = await prisma.$queryRaw<ResponseLivro[]>`

        SELECT id, nome, autor, ano, categoria, quantidade,  "instituicaoID"
        FROM "Livro"
    `;

        return resposta;
    }

    public async listaLivrosId(id: number): Promise<ResponseLivro | null> {
        const resposta = await prisma.$queryRaw<ResponseLivro[]>`

        SELECT  id, nome, autor, ano, categoria, quantidade, "instituicaoID" 
        FROM "Livro"
        WHERE id = ${id};
    `;

        return resposta[0] ?? null;
    }

    public async listaLivrosInstituicao(id: number): Promise<ResponseLivro[]> {
        const resposta = await prisma.$queryRaw<ResponseLivro[]>`
        
        SELECT  id, nome, autor, ano, categoria, quantidade, "instituicaoID" 
        FROM "Livro"
        WHERE "instituicaoID" = ${id}; 
    `;
        return resposta;
    }

    public async atualizarLivro(id: number, data: UpdateLivro): Promise<UpdateResponseLivro> {
        const livroAtual = await this.listaLivrosId(id);

        const updateData = {
            nome: data.nome ?? livroAtual?.nome,
            autor: data.autor ?? livroAtual?.autor,
            ano: data.ano ?? livroAtual?.ano,
            quantidade: data.quantidade ?? livroAtual?.quantidade,
            categoria: data.categoria ?? livroAtual?.categoria,
            instituicaoID: data.instituicaoID ?? livroAtual?.instituicaoID
        };

        const resposta = await prisma.$queryRaw<UpdateResponseLivro[]>`

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

    public async deleteLivro(id: number): Promise<number> {
        const resposta = await prisma.$executeRaw`

        DELETE 
        FROM "Livro" 
        WHERE id = ${id}
    `;

        return resposta;
    }
}