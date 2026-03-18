/* importes*/
import { listarLivro } from "../api/livro.js"

/* Botões */
const btn_criarL = document.querySelector("#btn_criarL");
const btn_fecharForm = document.querySelector("#btn_fecharForm");

/* formulario */
const fundo_formulario = document.querySelector("#fundo_formulario");


/* Eventos */

btn_criarL.addEventListener("click",()=>{
    fundo_formulario.classList.remove("ocultar_formulario");
})

btn_fecharForm.addEventListener("click",()=>{
    fundo_formulario.classList.add("ocultar_formulario");
});


window.addEventListener("DOMContentLoaded", listarLivro())