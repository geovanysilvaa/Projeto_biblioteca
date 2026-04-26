/* imports*/
import { listarLivroInstituicao, cadastrarLivro, updateLivro, deletarLivro,listarLivroID } from "../api/livro.js";
import { CaixaMsg } from "../componentes/mensagem.js";


/* formulario */
const fundo_formulario = document.querySelector("#fundo_formulario");
const corpo_formulario = document.querySelector("#corpo_formulario");

/* container */
const lista_livro = document.querySelector("#lista_livro");

let formulario = "c";
let idLivro = "0";

/* Eventos */
document.addEventListener("click", (evento) => {

    const btn = evento.target.closest("#btn_criarL");
    if (btn) {
        const titulo_Form = document.getElementById("titulo_Form").innerHTML = "Cadastrar livro";
        fundo_formulario.classList.remove("ocultar_formulario");
        formulario = "c";
        InputLivro();
    }
});

document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("#btn_fecharForm");
    if (btn) {
        fundo_formulario.classList.add("ocultar_formulario");
    }
});

async function InputLivro(id) {

    let dados= await listarLivroID(id);

    // console.log(dados.dados);

    if (formulario == "i") {

        const inome = document.querySelector("#inome");
        inome.value = dados.dados.nome;
        const iautor = document.querySelector("#iautor");
        iautor.value = dados.dados.autor;
        const icategoria = document.querySelector("#icategoria");
        icategoria.value = dados.dados.categoria;
        const iano = document.querySelector("#iano");
        iano.value = dados.dados.ano;
        const iquantidade = document.querySelector("#iquantidade");
        iquantidade.value = dados.dados.quantidade;

    } else if (formulario == "c") {

        const inome = document.querySelector("#inome");
        inome.value = '';
        const iautor = document.querySelector("#iautor");
        iautor.value = '';
        const icategoria = document.querySelector("#icategoria");
        icategoria.value = '';
        const iano = document.querySelector("#iano");
        iano.value = '';
        const iquantidade = document.querySelector("#iquantidade");
        iquantidade.value = '';
    }
}

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

    if (formulario == "c") {
        cadastrarLivro(dados);
    } else if (formulario == "i") {
        // console.log(idLivro)
        updateLivro(idLivro, dados);
    }

    corpo_formulario.reset();
    fundo_formulario.classList.add("ocultar_formulario");
});

function limparLista() {

    if (lista_livro) {
        lista_livro.innerHTML = "";
        return;
    }
}

export async function listarLivro(id) {

    const dados = await listarLivroInstituicao(id);

    limparLista();

    dados.dados.map((elemento) => {

        const corpo_livro = document.createElement("div");
        corpo_livro.setAttribute("class", "corpo_livro");

        const fundo_livro = document.createElement("div");
        fundo_livro.setAttribute("class", "fundo_livro");

        const id = document.createElement("div");
        id.setAttribute("class", "dados");
        id.textContent = elemento.id;

        const nome = document.createElement("div");
        nome.setAttribute("class", "dados");
        nome.textContent = elemento.nome;

        const categoria = document.createElement("div");
        categoria.setAttribute("class", "dados");
        categoria.textContent = elemento.categoria;

        const btn_rodape = document.createElement("div");
        btn_rodape.setAttribute("class", "btn_rodape");

        const btn_editar = document.createElement("button");
        btn_editar.setAttribute("class", "btn_editar");
        btn_editar.setAttribute("data-id", elemento.id)

        const img_editar = document.createElement("img");
        img_editar.setAttribute("class", "btn_i");
        img_editar.setAttribute("src", "../icons/iconEditar.png");

        btn_editar.addEventListener("click", (evento) => {

            formulario = "i";
            idLivro = evento.currentTarget.dataset.id;
            InputLivro(idLivro);
            const titulo_Form = document.getElementById("titulo_Form").innerHTML = "Editar Livro";
            fundo_formulario.classList.remove("ocultar_formulario");
        });

        const btn_apagar = document.createElement("button");
        btn_apagar.setAttribute("class", "btn_apagar");
        btn_apagar.setAttribute("data-id", elemento.id);

        const img_apagar = document.createElement("img");
        img_apagar.setAttribute("class", "btn_i");
        img_apagar.setAttribute("src", "../icons/iconDelete.png");

        btn_apagar.addEventListener("click", (evento) => {

            let id = evento.currentTarget.dataset.id;
            let msg = new CaixaMsg('sn', 'Alerta', 'Deseja apagar esse livro?');

            msg.monstrar()
                .then(resultado => {
                    if (resultado) {
                        deletarLivro(id);
                    }
                });
        });
        
        btn_editar.appendChild(img_editar)
        btn_apagar.appendChild(img_apagar)

        btn_rodape.appendChild(btn_editar);
        btn_rodape.appendChild(btn_apagar);
        fundo_livro.append(id, nome, categoria);
        corpo_livro.appendChild(fundo_livro);

        corpo_livro.appendChild(btn_rodape);
        lista_livro.appendChild(corpo_livro);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const id = localStorage.getItem("id");
    listarLivro(id);
});