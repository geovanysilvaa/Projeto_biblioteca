import { CreateAluno, ResponseAluno, UpdateAluno } from "@/models/dto.aluno";
import { IAlunoRepository } from "../interfaces/IAluno/IAlunoRepository";
import { prisma } from "../lib/prisma";



export class RepositoryAluno implements IAlunoRepository {

    public async cadastrarAluno(data: CreateAluno): Promise<ResponseAluno | null> {
        const resposta = await prisma.$queryRaw<ResponseAluno[]>`

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

    public async listarAluno(): Promise<ResponseAluno[]> {
        const resposta = await prisma.$queryRaw<ResponseAluno[]>`

        SELECT id, nome, turma, "instituicaoID" 
        FROM "Aluno";
    `;

        return resposta;
    }

    public async listarAlunoId(id: number): Promise<ResponseAluno | null> {
        const resposta = await prisma.$queryRaw<ResponseAluno[]>`

        SELECT id, nome, turma, "instituicaoID" 
        FROM "Aluno"
        WHERE id = ${id}
    `;
        return resposta[0] ?? null;
    }

    public async atualizarCadastro(id: number, data: UpdateAluno): Promise<ResponseAluno> {
        const alunoAtual = await this.listarAlunoId(id);

        const updateData = {
            nome:data.nome ?? alunoAtual?.nome,
            turma:data.turma ?? alunoAtual?.turma,
            instituicaoID:data.instituicaoID ?? alunoAtual?.instituicaoID
        }

        const resposta = await prisma.$queryRaw<ResponseAluno[]>`

        UPDATE "Aluno"
        SET nome = ${updateData.nome},
        turma = ${updateData.turma},
        "instituicaoID" = ${updateData.instituicaoID} 
        WHERE id = ${id}
        RETURNING id, nome, turma, "instituicaoID";
     `;

        return resposta[0];
    }

    public async deleteCadastro(id: number): Promise<number> {
        const resposta = await prisma.$executeRaw<number>`

        DELETE 
        FROM"Aluno" 
        WHERE id = ${id}
    `;

        return resposta;
    }
}