import { CreateInstituicaoDTO,LoginInstituicaoDTO,ResponseInstituicaoDTO, UpdateInstituicaoDTO } from "../../models/dto.instituicao";


export interface IServiceInstituicao {
    
    login(data:LoginInstituicaoDTO):Promise<ResponseInstituicaoDTO>
    cadastrar(data: CreateInstituicaoDTO): Promise<ResponseInstituicaoDTO>;
    listar(): Promise<ResponseInstituicaoDTO[]>;
    listarId(id: number): Promise<ResponseInstituicaoDTO | null>;
    atualizar(id: number, data: UpdateInstituicaoDTO): Promise<ResponseInstituicaoDTO>;
    deletar(id: number): Promise<void>;
}