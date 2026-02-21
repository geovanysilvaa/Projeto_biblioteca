import { CreateInstituicaoDTO, ResponseSegureRepository, UpdateInstituicaoDTO } from "../models/dto.instituicao";
import { IIRepositoryInstituicao } from "../interfaces/Instituicao/InstituicaoRepository";
import { prisma } from "../lib/prisma";

/**
 * Clases resposavel por CRUD da Instituição. 
 * 
*/
export class InstituicaoRepository implements IIRepositoryInstituicao {


    /**
     * Metodo cadastrar Instituição.
     * @param data - dados (Instituição)
     * @returns resposta com os campos (data)
    */
    async cadastrar(data: CreateInstituicaoDTO): Promise<ResponseSegureRepository> {
        const resposta = await prisma.instituicao.create
            (
                {
                    data
                }
            );

        return resposta;
    }

    async listar(): Promise<ResponseSegureRepository[]> {
        const resposta = await prisma.instituicao.findMany
            (
                {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        senha: true,
                        createdAt: true
                    }
                }
            );

        return resposta;
    }

    async listarEmail(email: string): Promise<ResponseSegureRepository | null> {
        const resposta = await prisma.instituicao.findUnique
            (
                {
                    where: { email },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        senha: true,
                        createdAt: true
                    }
                }
            );

        return resposta;
    }

    async listarId(id: number): Promise<ResponseSegureRepository | null> {
        const resposta = await prisma.instituicao.findUnique
            (
                {
                    where: { id },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        senha: true,
                        createdAt: true
                    }
                }
            );

        return resposta;
    }

    async atualizar(id: number, data: UpdateInstituicaoDTO): Promise<ResponseSegureRepository> {
        const resposta = await prisma.instituicao.update
            (
                {
                    where: { id },
                    data,
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        senha: true,
                        createdAt: true
                    }
                }
            );

        return resposta;
    }

    async deletar(id: number): Promise<void> {
        await prisma.instituicao.delete
            (
                {
                    where: { id }
                }
            );
    }
}