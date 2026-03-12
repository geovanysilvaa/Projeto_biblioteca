import { CreateAluno, ResponseAluno, UpdateAluno } from "../../models/dto.aluno";

export interface IAlunoRepository {

    cadastrarAluno(data: CreateAluno): Promise<ResponseAluno | null>;
    listarAluno(): Promise<ResponseAluno[]>;
    listarAlunoId(id: number): Promise<ResponseAluno | null>;
    atualizarCadastro(id: number, data: UpdateAluno): Promise<ResponseAluno>;
    deleteCadastro(id: number): Promise<number>;
}