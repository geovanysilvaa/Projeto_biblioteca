import { CreateLivro, ResponseLivro, UpdateResponseLivro, UpdateLivro } from "../../models/dto.livro";

export interface IlivroRepository {

    cadastrarLivro(data: CreateLivro): Promise<ResponseLivro | null>;
    listaLivros(): Promise<ResponseLivro[]>;
    listaLivrosId(id: number): Promise<ResponseLivro | null>;
    atualizarLivro(id: number, data: UpdateLivro): Promise<UpdateResponseLivro>;
    deleteLivro(id: number): Promise<number>;
}