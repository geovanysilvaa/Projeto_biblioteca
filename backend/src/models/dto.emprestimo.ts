export interface CreateEmprestimo {
    data_emprestimo: Date;
    data_devolucao: Date;
    instituicaoID: number;
    livroID: number;
    alunoID: number;
}

export interface ResponseEmprestimo {
    id: number;
    data_emprestimo: Date;
    data_devolucao: Date;
    instituicaoID: number;
    livroID: number;
    alunoID: number;
}

export interface UpdateEmprestimo {
    data_emprestimo?: Date;
    data_devolucao?: Date;
    instituicaoID?: number;
    livroID?: number;
    alunoID?: number;
}

