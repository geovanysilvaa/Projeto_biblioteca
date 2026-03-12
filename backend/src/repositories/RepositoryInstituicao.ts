import { CreateInstituicaoDTO, ResponseInstituicaoSecureDTO, UpdateInstituicaoDTO } from "../models/dto.instituicao";
import { IIRepositoryInstituicao } from "../interfaces/Instituicao/InstituicaoRepository";
import { prisma } from "../lib/prisma";


/*Testado*/
export class InstituicaoRepository implements IIRepositoryInstituicao {

    public async cadastrar(data: CreateInstituicaoDTO): Promise<ResponseInstituicaoSecureDTO | null> {
        const resposta = await prisma.$queryRaw<ResponseInstituicaoSecureDTO[]>`

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

    public async listar(): Promise<ResponseInstituicaoSecureDTO[]> {
        const resposta = await prisma.$queryRaw<ResponseInstituicaoSecureDTO[]>`

        SELECT id,nome,senha, email, "createdAt" 
        FROM "Instituicao";
    `;

        return resposta;
    }

    public async listarEmail(email: string): Promise<ResponseInstituicaoSecureDTO | null> {
        const resposta = await prisma.$queryRaw<ResponseInstituicaoSecureDTO[]>`

        SELECT id, nome, email, senha, "createdAt"
        FROM "Instituicao"
        WHERE email = ${email};
    `;

        return resposta[0] ?? null;
    }

    public async listarId(id: number): Promise<ResponseInstituicaoSecureDTO | null> {
        const resposta = await prisma.$queryRaw<ResponseInstituicaoSecureDTO[]>`

        SELECT id, nome, email, senha, "createdAt"
        FROM "Instituicao"
        WHERE id = ${id};
    `;

        return resposta[0] ?? null;
    }

    public async atualizar(id: number, data: UpdateInstituicaoDTO): Promise<ResponseInstituicaoSecureDTO> {
        const resposta = await prisma.$queryRaw<ResponseInstituicaoSecureDTO[]>`

        UPDATE "Instituicao"
        SET nome = ${data.nome},
        email = ${data.email},
        senha = ${data.senha}
        WHERE id = ${id}
        RETURNING id, nome, email, senha, "createdAt";
     `;

        return resposta[0];
    }

    public async deletar(id: number): Promise<number> {
        const resposta = await prisma.$executeRaw`
        
        DELETE 
        FROM "Instituicao" 
        WHERE id = ${id};
    `;

        return resposta;
    }
}