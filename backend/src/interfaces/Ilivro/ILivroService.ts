import { CreateLivro, ResponseLivro, UpdateLivro } from "../../models/dto.livro";

export interface IServiceLivro {

    cadastrarLivro(data: CreateLivro): Promise<ResponseLivro>;
    listarTodos(): Promise<ResponseLivro[]>;
    listarId(id:number):Promise<ResponseLivro>;
    atualizarLivro(id: number, data: UpdateLivro): Promise<ResponseLivro>;
    delete(id: number): Promise<number>;
}