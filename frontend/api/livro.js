/* imports*/
import { mensagemE, mensagemS, msg } from "../componentes/mensagem.js";

/* endpoint */
const endpointListaLivro = "http://localhost:3000/livro/instituicao";
const endpointLivroDelete = "http://localhost:3000/livro";
const endpointCadastraLivro = "http://localhost:3000/livro/cadastrar";
const endpointLivroUpdate = "http://localhost:3000/livro";

/* botões */
const btn_fecharFormV = document.querySelector("#btn_fecharFormV");

/* formularios */
const fundo_formularioV = document.querySelector("#fundo_formularioV");
const corpo_formularioV = document.querySelector("#corpo_formularioV");

/* conteiner */
const lista_livro = document.querySelector("#lista_livro");


btn_fecharFormV.addEventListener("click", () => {
    fundo_formularioV.classList.add("ocultar_formularioV");
});


export async function listarLivroInstituicao(id) {
    const resposta = await fetch(endpointListaLivro + `/${id}`);

    const info = await resposta.json();
    lista_livro.innerHTML = "";

    if(!info.sucesso){
        mensagemE(info.message);
        return;
    }

    info.dados.map((elemento) => {

        const divconteiner = document.createElement("div");
        divconteiner.setAttribute("class", "lista_livro")
        lista_livro.appendChild(divconteiner);


        const corpo_livro = document.createElement("div");
        corpo_livro.setAttribute("class", "corpo_livro");
        divconteiner.appendChild(corpo_livro);

        const titulo_livro = document.createElement("div");
        titulo_livro.setAttribute("class", "titulo_livro");
        corpo_livro.appendChild(titulo_livro);

        const pnome = document.createElement("p");
        pnome.innerHTML = `${elemento.nome}`;
        titulo_livro.appendChild(pnome);

        const fundo_livro = document.createElement("div");
        fundo_livro.setAttribute("class", "fundo_livro");
        corpo_livro.appendChild(fundo_livro);

        const rodape_livro = document.createElement("div");
        rodape_livro.setAttribute("class", "rodape_livro");
        corpo_livro.appendChild(rodape_livro);


        /* botão editar livro */
        const botao_editar = document.createElement("button");
        botao_editar.setAttribute("class", "btn_editar");
        botao_editar.setAttribute("id", elemento.id);
        rodape_livro.appendChild(botao_editar);

        botao_editar.addEventListener("click", (evento) => {
            fundo_formularioV.classList.remove("ocultar_formularioV");
            const id = evento.currentTarget.id;

            if (evento.target) {
                corpo_formularioV.addEventListener("submit", (evento) => {
                    evento.preventDefault();


                    const inome = document.querySelector("#vnome").value;
                    const iautor = document.querySelector("#vautor").value;
                    const icategoria = document.querySelector("#vcategoria").value;
                    const iano = document.querySelector("#vano").value;
                    const iquantidade = document.querySelector("#vquantidade").value;

                    if (!inome || !iautor || !icategoria || !iano || !iquantidade) {
                        return;
                    }

                    let dados = {
                        nome: inome,
                        autor: iautor,
                        categoria: icategoria,
                        ano: iano,
                        quantidade: iquantidade
                    }

                    updateLivro(id, dados);
                    corpo_formularioV.reset();
                    fundo_formularioV.classList.add("ocultar_formularioV");
                })

            }
        });

        const imgeditar = document.createElement("img");
        imgeditar.setAttribute("src", "../icons/iconEditar.png")
        botao_editar.appendChild(imgeditar);
        /**/


        /* botão delete livro */
        const botao_delete = document.createElement("button");
        botao_delete.setAttribute("class", "btn_deletar");
        botao_delete.setAttribute("id", elemento.id);
        rodape_livro.appendChild(botao_delete);

        botao_delete.addEventListener("click", (evento) => {
            if (evento.target) {
                const id = evento.currentTarget.id;
                msg(id);
            }
        });

        const imgdeletar = document.createElement("img");
        imgdeletar.setAttribute("src", "../icons/iconDelete.png")
        botao_delete.appendChild(imgdeletar);
        /**/


        /* Dados da (API) */
        const pautor = document.createElement("p");
        pautor.innerHTML = `Autor:${elemento.autor}`;
        fundo_livro.appendChild(pautor);

        const pquantidade = document.createElement("p");
        pquantidade.innerHTML = `Quantidade:${elemento.quantidade}`;
        fundo_livro.appendChild(pquantidade);

        const pcategoria = document.createElement("p");
        pcategoria.innerHTML = `Categoria:${elemento.categoria}`;
        fundo_livro.appendChild(pcategoria);

        const pano = document.createElement("p");
        pano.innerHTML = `Ano:${elemento.ano}`;
        fundo_livro.appendChild(pano);
    });
    /**/
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
        listarLivroInstituicao(idins);
        mensagemS(info.mensagem);
    } else {
        mensagemE(info.message);
    }

}

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
        listarLivroInstituicao(idins);
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
        const idins = localStorage.getItem("id");
        listarLivroInstituicao(idins);
        mensagemS(info.mensagem);
    } else {
        mensagemE(info.message);
    }
}