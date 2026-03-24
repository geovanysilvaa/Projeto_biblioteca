/* imports*/
import { listarLivroInstituicao, cadastrarLivro, updateLivro } from "../api/livro.js";
import { msg } from "../componentes/mensagem.js";


/* formulario */
const fundo_formulario = document.querySelector("#fundo_formulario");
const corpo_formulario = document.querySelector("#corpo_formulario");

/* formularios */
const fundo_formularioV = document.querySelector("#fundo_formularioV");
const corpo_formularioV = document.querySelector("#corpo_formularioV");

/* container */
const lista_livro = document.querySelector("#lista_livro");

/* Eventos */
document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("#btn_criarL");
    if (btn) {
        fundo_formulario.classList.remove("ocultar_formulario");
    }
})

document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("#btn_fecharForm");
    if (btn) {
        fundo_formulario.classList.add("ocultar_formulario");
    }
});

document.addEventListener("submit", (evento) => {
    const btn = evento.target.closest("#fundo_formulario");

    if (!btn) {
        return;
    }

    evento.preventDefault();

    const inome = document.querySelector("#inome").value;
    const iautor = document.querySelector("#iautor").value;
    const icategoria = document.querySelector("#icategoria").value;
    const iano = document.querySelector("#iano").value;
    const iquantidade = document.querySelector("#iquantidade").value;
    const instituicaoID = localStorage.getItem("id");

    if (!inome || !iautor || !icategoria || !iano || !iquantidade || !instituicaoID) {
        return;
    }

    let dados = {
        nome: inome,
        autor: iautor,
        categoria: icategoria,
        ano: iano,
        quantidade: iquantidade,
        instituicaoID: instituicaoID
    }

    cadastrarLivro(dados);
    corpo_formulario.reset();
    fundo_formulario.classList.add("ocultar_formulario");

});


export async function listarLivro(id) {

    const dados = await listarLivroInstituicao(id);
    lista_livro.innerHTML = "";
    console.log(dados)


    dados.dados.map((elemento) => {

        const divcontainer = document.createElement("div");
        divcontainer.setAttribute("class", "lista_livro")
        lista_livro.appendChild(divcontainer);

        const corpo_livro = document.createElement("div");
        corpo_livro.setAttribute("class", "corpo_livro");
        divcontainer.appendChild(corpo_livro);

        const titulo_livro = document.createElement("div");
        titulo_livro.setAttribute("class", "titulo_livro");
        corpo_livro.appendChild(titulo_livro);


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

        const btn_fecharFormV = document.querySelector("#btn_fecharFormV");

        btn_fecharFormV.addEventListener("click", () => {
            fundo_formularioV.classList.add("ocultar_formularioV");
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
        const pid = document.createElement("p");
        pid.innerHTML = `ID${elemento.id}`;
        titulo_livro.appendChild(pid);

        const pnome = document.createElement("p");
        pnome.innerHTML = `Titulo:${elemento.nome}`;
        fundo_livro.appendChild(pnome);

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

document.addEventListener("DOMContentLoaded", () => {
    const id = localStorage.getItem("id");
    listarLivro(id);
});