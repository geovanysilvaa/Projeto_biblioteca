/* imports */
import {
    listarEmprestimos,
    cadastrarEmprestimo,
    updateEmprestimo,
    deletarEmprestimo,
    listarEmprestimoId
} from "../api/emprestimo.js";
import { CaixaMsg } from "../componentes/mensagem.js";

/* formulario */
const fundo_formulario_emprestimo = document.querySelector("#fundo_formulario_emprestimo");
const corpo_formulario_emprestimo = document.querySelector("#corpo_formulario_emprestimo");

/* container */
const lista_emprestimo = document.querySelector("#lista_emprestimo");
const txt_emprestimo_vazio = document.querySelector("#emprestimoVazio");

let formulario = "c";
let idEmprestimo = "0";

document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("#btn_criar_emprestimo");
    if (btn) {
        document.getElementById("titulo_form_emprestimo").innerHTML = "Cadastrar emprestimo";
        fundo_formulario_emprestimo.classList.remove("ocultar_formulario_emprestimo");
        formulario = "c";
        inputEmprestimo();
    }
});

document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("#btn_fechar_form_emprestimo");
    if (btn) {
        fundo_formulario_emprestimo.classList.add("ocultar_formulario_emprestimo");
    }
});

function formatarDataInput(data) {
    if (!data) {
        return "";
    }
    return new Date(data).toISOString().split("T")[0];
}

function formatarDataLista(data) {
    if (!data) {
        return "";
    }
    return new Date(data).toLocaleDateString("pt-BR");
}

async function inputEmprestimo(id) {
    if (formulario == "i") {
        const dados = await listarEmprestimoId(id);

        document.querySelector("#idata_devolucao").value = formatarDataInput(dados.dados.data_devolucao);
        document.querySelector("#ilivro_id").value = dados.dados.livroID;
        document.querySelector("#ialuno_id").value = dados.dados.alunoID;
        document.querySelector("#iinstituicao_emprestimo").value = dados.dados.instituicaoID;
    } else if (formulario == "c") {
        document.querySelector("#idata_devolucao").value = "";
        document.querySelector("#ilivro_id").value = "";
        document.querySelector("#ialuno_id").value = "";
        document.querySelector("#iinstituicao_emprestimo").value = localStorage.getItem("id") ?? "";
    }
}

document.addEventListener("submit", (evento) => {
    const form = evento.target.closest("#corpo_formulario_emprestimo");
    if (!form) {
        return;
    }

    evento.preventDefault();

    const data_devolucao = document.querySelector("#idata_devolucao").value;
    const livroID = document.querySelector("#ilivro_id").value;
    const alunoID = document.querySelector("#ialuno_id").value;
    const instituicaoID = document.querySelector("#iinstituicao_emprestimo").value;

    if (!data_devolucao || !livroID || !alunoID || !instituicaoID) {
        let msg = new CaixaMsg("ok", "Alerta", "Preencha todos os campos.");
        msg.monstrar();
        return;
    }

    const dados = {
        data_devolucao: new Date(data_devolucao).toISOString(),
        livroID: Number(livroID),
        alunoID: Number(alunoID),
        instituicaoID: Number(instituicaoID)
    };

    if (formulario == "c") {
        cadastrarEmprestimo(dados).then(() => listarEmprestimo());
    } else if (formulario == "i") {
        updateEmprestimo(idEmprestimo, dados).then(() => listarEmprestimo());
    }

    corpo_formulario_emprestimo.reset();
    fundo_formulario_emprestimo.classList.add("ocultar_formulario_emprestimo");
});

function limparLista() {
    if (lista_emprestimo) {
        lista_emprestimo.innerHTML = "";
    }
}

export async function listarEmprestimo() {
    const idInstituicaoLogada = Number(localStorage.getItem("id"));
    const resposta = await listarEmprestimos();

    limparLista();

    if (!resposta || !resposta.dados) {
        return;
    }

    const dadosFiltrados = resposta.dados.filter((emprestimo) => emprestimo.instituicaoID === idInstituicaoLogada);

    if (dadosFiltrados.length === 0) {
        txt_emprestimo_vazio.textContent = "Nenhum emprestimo cadastrado.";
        return;
    } else {
        txt_emprestimo_vazio.textContent = "";
    }

    dadosFiltrados.map((elemento) => {
        const corpo_emprestimo = document.createElement("div");
        corpo_emprestimo.setAttribute("class", "corpo_emprestimo");

        const fundo_emprestimo = document.createElement("div");
        fundo_emprestimo.setAttribute("class", "fundo_emprestimo");

        const id = document.createElement("div");
        id.setAttribute("class", "dados_emprestimo");
        id.textContent = elemento.id;

        const dataEmprestimo = document.createElement("div");
        dataEmprestimo.setAttribute("class", "dados_emprestimo");
        dataEmprestimo.textContent = formatarDataLista(elemento.data_emprestimo);

        const dataDevolucao = document.createElement("div");
        dataDevolucao.setAttribute("class", "dados_emprestimo");
        dataDevolucao.textContent = formatarDataLista(elemento.data_devolucao);

        const livroID = document.createElement("div");
        livroID.setAttribute("class", "dados_emprestimo");
        livroID.textContent = elemento.livroID;

        const alunoID = document.createElement("div");
        alunoID.setAttribute("class", "dados_emprestimo");
        alunoID.textContent = elemento.alunoID;

        const instituicaoID = document.createElement("div");
        instituicaoID.setAttribute("class", "dados_emprestimo");
        instituicaoID.textContent = elemento.instituicaoID;

        const btn_rodape_emprestimo = document.createElement("div");
        btn_rodape_emprestimo.setAttribute("class", "btn_rodape_emprestimo");

        const btn_editar_emprestimo = document.createElement("button");
        btn_editar_emprestimo.setAttribute("class", "btn_editar_emprestimo");
        btn_editar_emprestimo.setAttribute("data-id", elemento.id);

        const img_editar_emprestimo = document.createElement("img");
        img_editar_emprestimo.setAttribute("class", "btn_i_emprestimo");
        img_editar_emprestimo.setAttribute("src", "../icons/iconEditar.png");

        btn_editar_emprestimo.addEventListener("click", (evento) => {
            formulario = "i";
            idEmprestimo = evento.currentTarget.dataset.id;
            inputEmprestimo(idEmprestimo);
            document.getElementById("titulo_form_emprestimo").innerHTML = "Editar emprestimo";
            fundo_formulario_emprestimo.classList.remove("ocultar_formulario_emprestimo");
        });

        const btn_apagar_emprestimo = document.createElement("button");
        btn_apagar_emprestimo.setAttribute("class", "btn_apagar_emprestimo");
        btn_apagar_emprestimo.setAttribute("data-id", elemento.id);

        const img_apagar_emprestimo = document.createElement("img");
        img_apagar_emprestimo.setAttribute("class", "btn_i_emprestimo");
        img_apagar_emprestimo.setAttribute("src", "../icons/iconDelete.png");

        btn_apagar_emprestimo.addEventListener("click", (evento) => {
            let idExcluir = evento.currentTarget.dataset.id;
            let msg = new CaixaMsg("sn", "Alerta", "Deseja apagar esse emprestimo?");

            msg.monstrar().then((resultado) => {
                if (resultado) {
                    deletarEmprestimo(idExcluir).then(() => listarEmprestimo());
                }
            });
        });

        btn_editar_emprestimo.appendChild(img_editar_emprestimo);
        btn_apagar_emprestimo.appendChild(img_apagar_emprestimo);
        btn_rodape_emprestimo.appendChild(btn_editar_emprestimo);
        btn_rodape_emprestimo.appendChild(btn_apagar_emprestimo);

        fundo_emprestimo.append(id, dataEmprestimo, dataDevolucao, livroID, alunoID, instituicaoID);
        corpo_emprestimo.appendChild(fundo_emprestimo);
        corpo_emprestimo.appendChild(btn_rodape_emprestimo);
        lista_emprestimo.appendChild(corpo_emprestimo);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    listarEmprestimo();
    inputEmprestimo();
});
