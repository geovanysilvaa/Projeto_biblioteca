/* imports */
import { listarAlunos, cadastrarAluno, updateAluno, deletarAluno, listarAlunoId } from "../api/alunos.js";
import { CaixaMsg } from "../componentes/mensagem.js";

/* formulario */
const fundo_formulario_aluno = document.querySelector("#fundo_formulario_aluno");
const corpo_formulario_aluno = document.querySelector("#corpo_formulario_aluno");

/* container */
const lista_aluno = document.querySelector("#lista_aluno");
const txt_aluno_vazio = document.querySelector("#alunoVazio");

let formulario = "c";
let idAluno = "0";

/* Eventos */
document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("#btn_criar_aluno");
    if (btn) {
        document.getElementById("titulo_form_aluno").innerHTML = "Cadastrar aluno";
        fundo_formulario_aluno.classList.remove("ocultar_formulario_aluno");
        formulario = "c";
        inputAluno();
    }
});

document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("#btn_fechar_form_aluno");
    if (btn) {
        fundo_formulario_aluno.classList.add("ocultar_formulario_aluno");
    }
});

async function inputAluno(id) {
    if (formulario == "i") {
        let dados = await listarAlunoId(id);

        const inome_aluno = document.querySelector("#inome_aluno");
        inome_aluno.value = dados.dados.nome;
        const iturma_aluno = document.querySelector("#iturma_aluno");
        iturma_aluno.value = dados.dados.turma;
        const iinstituicao_aluno = document.querySelector("#iinstituicao_aluno");
        iinstituicao_aluno.value = dados.dados.instituicaoID;
    } else if (formulario == "c") {
        const inome_aluno = document.querySelector("#inome_aluno");
        inome_aluno.value = "";
        const iturma_aluno = document.querySelector("#iturma_aluno");
        iturma_aluno.value = "";
        const iinstituicao_aluno = document.querySelector("#iinstituicao_aluno");
        iinstituicao_aluno.value = localStorage.getItem("id") ?? "";
    }
}

document.addEventListener("submit", (evento) => {
    const form = evento.target.closest("#corpo_formulario_aluno");
    if (!form) {
        return;
    }

    evento.preventDefault();

    const nome = document.querySelector("#inome_aluno").value;
    const turma = document.querySelector("#iturma_aluno").value;
    const instituicaoID = document.querySelector("#iinstituicao_aluno").value;

    if (!nome || !turma || !instituicaoID) {
        let msg = new CaixaMsg('ok', 'Alerta', 'Preencha todos os campos.');
        msg.monstrar();
        return;
    }

    let dados = {
        nome: nome,
        turma: turma,
        instituicaoID: Number(instituicaoID)
    };

    if (formulario == "c") {
        cadastrarAluno(dados)
            .then(() => listarAluno());
    } else if (formulario == "i") {
        updateAluno(idAluno, dados)
            .then(() => listarAluno());
    }

    corpo_formulario_aluno.reset();
    fundo_formulario_aluno.classList.add("ocultar_formulario_aluno");
});

function limparLista() {
    if (lista_aluno) {
        lista_aluno.innerHTML = "";
    }
}

export async function listarAluno() {
    const idInstituicaoLogada = Number(localStorage.getItem("id"));
    const resposta = await listarAlunos();

    limparLista();

    if (!resposta || !resposta.dados) {
        return;
    }

    const dadosFiltrados = resposta.dados.filter((aluno) => aluno.instituicaoID === idInstituicaoLogada);

    if (dadosFiltrados.length === 0) {
        txt_aluno_vazio.textContent = "Nenhum aluno cadastrado.";
        return;
    } else {
        txt_aluno_vazio.textContent = "";
    }

    dadosFiltrados.map((elemento) => {
        const corpo_aluno = document.createElement("div");
        corpo_aluno.setAttribute("class", "corpo_aluno");

        const fundo_aluno = document.createElement("div");
        fundo_aluno.setAttribute("class", "fundo_aluno");

        const id = document.createElement("div");
        id.setAttribute("class", "dados_aluno");
        id.textContent = elemento.id;

        const nome = document.createElement("div");
        nome.setAttribute("class", "dados_aluno");
        nome.textContent = elemento.nome;

        const turma = document.createElement("div");
        turma.setAttribute("class", "dados_aluno");
        turma.textContent = elemento.turma;

        const instituicaoID = document.createElement("div");
        instituicaoID.setAttribute("class", "dados_aluno");
        instituicaoID.textContent = elemento.instituicaoID;

        const btn_rodape_aluno = document.createElement("div");
        btn_rodape_aluno.setAttribute("class", "btn_rodape_aluno");

        const btn_editar_aluno = document.createElement("button");
        btn_editar_aluno.setAttribute("class", "btn_editar_aluno");
        btn_editar_aluno.setAttribute("data-id", elemento.id);

        const img_editar_aluno = document.createElement("img");
        img_editar_aluno.setAttribute("class", "btn_i_aluno");
        img_editar_aluno.setAttribute("src", "../icons/iconEditar.png");

        btn_editar_aluno.addEventListener("click", (evento) => {
            formulario = "i";
            idAluno = evento.currentTarget.dataset.id;
            inputAluno(idAluno);
            document.getElementById("titulo_form_aluno").innerHTML = "Editar aluno";
            fundo_formulario_aluno.classList.remove("ocultar_formulario_aluno");
        });

        const btn_apagar_aluno = document.createElement("button");
        btn_apagar_aluno.setAttribute("class", "btn_apagar_aluno");
        btn_apagar_aluno.setAttribute("data-id", elemento.id);

        const img_apagar_aluno = document.createElement("img");
        img_apagar_aluno.setAttribute("class", "btn_i_aluno");
        img_apagar_aluno.setAttribute("src", "../icons/iconDelete.png");

        btn_apagar_aluno.addEventListener("click", (evento) => {
            let id = evento.currentTarget.dataset.id;
            let msg = new CaixaMsg('sn', 'Alerta', 'Deseja apagar esse aluno?');

            msg.monstrar()
                .then(resultado => {
                    if (resultado) {
                        deletarAluno(id)
                            .then(() => listarAluno());
                    }
                });
        });

        btn_editar_aluno.appendChild(img_editar_aluno);
        btn_apagar_aluno.appendChild(img_apagar_aluno);

        btn_rodape_aluno.appendChild(btn_editar_aluno);
        btn_rodape_aluno.appendChild(btn_apagar_aluno);
        fundo_aluno.append(id, nome, turma, instituicaoID);
        corpo_aluno.appendChild(fundo_aluno);
        corpo_aluno.appendChild(btn_rodape_aluno);
        lista_aluno.appendChild(corpo_aluno);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    listarAluno();
    inputAluno();
});
