import { CreateInstituicaoDTO, UpdateInstituicaoDTO, ResponseInstituicaoDTO, LoginInstituicaoDTO, ResponseSegureRepository } from "../models/dto.instituicao"

export interface IIRepositoryInstituicao {

    cadastrar(data: CreateInstituicaoDTO): Promise<ResponseSegureRepository>;
    listar(): Promise<ResponseSegureRepository[]>;
    listarEmail(email:string):Promise<ResponseSegureRepository | null>;
    listarId(id: number): Promise<ResponseSegureRepository | null>;
    atualizar(id: number, data: UpdateInstituicaoDTO): Promise<ResponseSegureRepository>;
    deletar(id: number): Promise<void>;
}