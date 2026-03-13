import { CreateEmprestimo, ResponseEmprestimo, UpdateEmprestimo, } from "../models/dto.emprestimo";
import { IRepositoryEmprestimo } from "../interfaces/IEmprestimo/IEmprestimoRepository";
import { prisma } from "../lib/prisma";



export class RepositoryEmprestimo implements IRepositoryEmprestimo {

    public async cadastrarEmprestimo(data: CreateEmprestimo): Promise<ResponseEmprestimo | null> {
        const resposta = await prisma.$queryRaw<ResponseEmprestimo[]>`
        
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

    public async listarTodos(): Promise<ResponseEmprestimo[]> {
        const resposta = await prisma.$queryRaw<ResponseEmprestimo[]>`
        
        SELECT id, data_emprestimo, data_devolucao,  "instituicaoID", "livroID", "alunoID" 
        FROM "Emprestimo";
    `;

        return resposta;
    }

    public async listarId(id: number): Promise<ResponseEmprestimo | null> {
        const resposta = await prisma.$queryRaw<ResponseEmprestimo[]>`

        SELECT id, data_emprestimo, data_devolucao,  "instituicaoID", "livroID", "alunoID" 
        FROM "Emprestimo"
        WHERE id = ${id}
    `;

        return resposta[0] ?? null;
    }

    public async atualizarEmprestimo(id: number, data: UpdateEmprestimo): Promise<ResponseEmprestimo> {
        const emprestimoAtual = await this.listarId(id);

        const updateData = {
            data_devolucao: data.data_devolucao ?? emprestimoAtual?.data_devolucao,
            instituicaoID: data.instituicaoID ?? emprestimoAtual?.instituicaoID,
            livroID: data.livroID ?? emprestimoAtual?.livroID,
            alunoID: data.alunoID ?? emprestimoAtual?.alunoID
        }

        const resposta = await prisma.$queryRaw<ResponseEmprestimo[]>`

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

    public async delete(id: number): Promise<number> {
        const resposta = await prisma.$executeRaw<number>`

        DELETE 
        FROM "Emprestimo" 
        WHERE id = ${id}
    `;

        return resposta;
    }
}