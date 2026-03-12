import { CreateInstituicaoDTO, UpdateInstituicaoDTO, ResponseInstituicaoSecureDTO,ResponseInstituicaoDTO } from "../../models/dto.instituicao"

export interface IIRepositoryInstituicao {

    cadastrar(data: CreateInstituicaoDTO): Promise<ResponseInstituicaoSecureDTO | null>;
    listar(): Promise<ResponseInstituicaoSecureDTO[]>;
    listarEmail(email:string):Promise<ResponseInstituicaoSecureDTO | null>;
    listarId(id: number): Promise<ResponseInstituicaoSecureDTO | null>;
    atualizar(id: number, data: UpdateInstituicaoDTO): Promise<ResponseInstituicaoSecureDTO>;
    deletar(id: number): Promise<number>;
}