/* imports*/
import { mensagemE, mensagemS } from "../componentes/mensagem.js";
import { listarLivro } from "../scripts/pag_cadastro.js";

/* endpoints */
const endpointLivroDelete = "http://localhost:3000/livro";
const endpointLivroUpdate = "http://localhost:3000/livro";
const endpointListaLivro = "http://localhost:3000/livro/instituicao";
const endpointCadastraLivro = "http://localhost:3000/livro/cadastrar";


export async function cadastrarLivro(dados) {
    const resposta = await fetch(endpointCadastraLivro, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const info = await resposta.json();

    if (info.sucesso) {
        const idins = localStorage.getItem("id");
        listarLivro(idins);
        mensagemS(info.mensagem);
    } else {
        mensagemE(info.message);
    }
}

export async function listarLivroInstituicao(id) {
    try {

        const resposta = await fetch(endpointListaLivro + `/${id}`);

        const info = await resposta.json();
        if(!resposta.ok){
            throw new Error(info.message);
        }else{
            return info;
        }
    } catch (error) {
        mensagemE(error);
    }
}

export async function updateLivro(id, dados01) {
    const resposta = await fetch(endpointLivroUpdate + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados01)
    });

    const info = await resposta.json();

    if (info.sucesso) {
        const idins = localStorage.getItem("id")
        listarLivro(idins);
        mensagemS(info.mensagem);
    } else {
        mensagemE(info.message);
    }

}

export async function deletarLivro(id) {
    const resposta = await fetch(endpointLivroDelete + `/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const info = await resposta.json();

    if (info.sucesso) {
        mensagemS(info.mensagem);
        const idins = localStorage.getItem("id");
        listarLivro(idins);
    } else {
        mensagemE(info.message);
    }
}