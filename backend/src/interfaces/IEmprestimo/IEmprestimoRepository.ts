import { CreateEmprestimo, ResponseEmprestimo, UpdateEmprestimo } from "../../models/dto.emprestimo";

export interface IRepositoryEmprestimo {

    cadastrarEmprestimo(data: CreateEmprestimo): Promise<ResponseEmprestimo | null>;
    listarTodos(): Promise<ResponseEmprestimo[]>;
    listarId(id: number): Promise<ResponseEmprestimo | null>;
    atualizarEmprestimo(id: number, data: UpdateEmprestimo): Promise<ResponseEmprestimo>;
    delete(id: number): Promise<number>
}