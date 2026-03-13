import { CreateEmprestimo, ResponseEmprestimo, UpdateEmprestimo } from "../../models/dto.emprestimo";

export interface IEmprestimoService {

    novoEmprestimo(data: CreateEmprestimo): Promise<ResponseEmprestimo>;
    listarEmprestimos(): Promise<ResponseEmprestimo[]>;
    listarEmprestimoId(id: number): Promise<ResponseEmprestimo>;
    atualizarEmprestimo(id:number, data: UpdateEmprestimo): Promise<ResponseEmprestimo>;
    delete(id: number): Promise<number>;
}