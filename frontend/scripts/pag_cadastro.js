/* imports*/
import { listarLivroInstituicao, cadastrarLivro } from "../api/livro.js";

/* Botões */
const btn_criarL = document.querySelector("#btn_criarL");
const btn_fecharForm = document.querySelector("#btn_fecharForm");

/* formulario */
const fundo_formulario = document.querySelector("#fundo_formulario");
const corpo_formulario = document.querySelector("#corpo_formulario");


/* Eventos */
btn_criarL.addEventListener("click", () => {
    fundo_formulario.classList.remove("ocultar_formulario");
})

btn_fecharForm.addEventListener("click", () => {
    fundo_formulario.classList.add("ocultar_formulario");
});

corpo_formulario.addEventListener("submit", (evento) => {
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


document.addEventListener("DOMContentLoaded", () => {
    const id = localStorage.getItem("id");
    listarLivroInstituicao(id);
})