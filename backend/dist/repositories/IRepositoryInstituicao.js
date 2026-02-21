"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoRepository = void 0;
const prisma_1 = require("../lib/prisma");
/**
 * Clases resposavel por CRUD da Instituição.
 *
*/
class InstituicaoRepository {
    /**
     * Metodo cadastrar Instituição.
     * @param data - dados (Instituição)
     * @returns resposta com os campos (data)
    */
    async cadastrar(data) {
        const resposta = await prisma_1.prisma.instituicao.create({
            data
        });
        return resposta;
    }
    async listar() {
        const resposta = await prisma_1.prisma.instituicao.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                createdAt: true
            }
        });
        return resposta;
    }
    async listarEmail(email) {
        const resposta = await prisma_1.prisma.instituicao.findUnique({
            where: { email },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                createdAt: true
            }
        });
        return resposta;
    }
    async listarId(id) {
        const resposta = await prisma_1.prisma.instituicao.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                createdAt: true
            }
        });
        return resposta;
    }
    async atualizar(id, data) {
        const resposta = await prisma_1.prisma.instituicao.update({
            where: { id },
            data,
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                createdAt: true
            }
        });
        return resposta;
    }
    async deletar(id) {
        await prisma_1.prisma.instituicao.delete({
            where: { id }
        });
    }
}
exports.InstituicaoRepository = InstituicaoRepository;
