/**
 * DTO Livro
*/

export interface CreateLivro {
    nome: string;
    autor: string;
    ano: number;
    categoria: string;
    quantidade: number;
    instituicaoID: number;
}

export interface ResponseLivro {
    id: number;
    nome: string;
    autor: string;
    ano: number;
    categoria: string;
    quantidade: number;
    instituicaoID: number;
}

export interface UpdateLivro {
    nome?: string;
    autor?: string;
    ano?: number;
    quantidade?: number;
    categoria?: string;
    instituicaoID?: number;
}

export interface UpdateResponseLivro {
    id:number;
    nome: string;
    autor: string;
    ano: number;
    quantidade: number;
    categoria: string;
    instituicaoID: number;
}
