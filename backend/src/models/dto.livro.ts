/**
 * DTO Livro
*/

interface CreateLivro{
    nome:string;
    autor:string;
    ano:string;
    quantidade:number;
    categorio:string;
    IdIntituicao:number;
}

interface ResponseLivro{
    id:number;
    nome:string;
    autor:string;
    ano:string;
    quantidade:number;
    categorio:string;
    IdIntituicao:number;
}

interface UpdateLivro{
    nome?:string;
    autor?:string;
    ano?:string;
    quantidade?:number;
    categorio?:string;
}
