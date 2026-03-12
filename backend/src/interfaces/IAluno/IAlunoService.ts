import { CreateAluno, ResponseAluno, UpdateAluno } from "../../models/dto.aluno";

export interface IAlunoService {

    cadastrarAluno(data: CreateAluno): Promise<ResponseAluno>;
    listarAlunos(): Promise<ResponseAluno[]>;
    listarAlunoId(id: number): Promise<ResponseAluno | null>;
    atualizarAluno(id: number, data: UpdateAluno): Promise<ResponseAluno>
    delete(id: number): Promise<number>;
}