/* imports */
import { deletarLivro } from "../api/livro.js";

/* container */
const container_mensagem = document.querySelector("#imensagem");

const imensagem = document.querySelector(".imensagem");
const corpo_msg = document.querySelector("#corpo_msg");

const corpo_msgV = document.querySelector("#corpo_msgV");
const imensagemV = document.querySelector(".imensagemV");


/* botões */
const btn_fecharmsgV = document.querySelector("#btn_fecharmsgV");
const btn_fecharmsg = document.querySelector("#btn_fecharmsg");
const btn_okV = document.querySelector("#btn_okV");
const btn_ok = document.querySelector("#btn_ok");


export function msg(id) {
    imensagemV.classList.remove("ocultar_mensagemV");
    const p = document.createElement("p");
    p.textContent = "";
    p.style.color = "red";
    p.textContent = "Voçê deseja apagar esse livro?";
    corpo_msgV.appendChild(p);

    btn_okV.onclick = async () => {
        p.innerHTML = "";
        p.remove();
        await deletarLivro(id);
        imensagemV.classList.add("ocultar_mensagemV");
    };

    btn_fecharmsgV.onclick = () => {
        p.innerHTML = "";
        p.remove();
        imensagemV.classList.add("ocultar_mensagemV");
    };
}

export function mensagemS(texto) {
    imensagem.classList.remove("ocultar_mensagem");
    const p = document.createElement("p");
    p.setAttribute("class", "sucessomsg")
    p.innerHTML = "";
    p.innerHTML = texto;
    corpo_msg.appendChild(p);

    btn_ok.onclick = () => {
        p.innerHTML = "";
        imensagem.classList.add("ocultar_mensagem");
    };

    btn_fecharmsg.onclick = () => {
        p.innerHTML = "";
        p.remove();
        imensagem.classList.add("ocultar_mensagem");
    };
}

export function mensagemE(texto) {
    imensagem.classList.remove("ocultar_mensagem");
    const p = document.createElement("p");
    p.setAttribute("class", "errormsg")
    p.innerHTML = "";
    p.innerHTML = texto;
    corpo_msg.appendChild(p);

    btn_ok.onclick = () => {
        p.innerHTML = "";
        imensagem.classList.add("ocultar_mensagem");
    };

    btn_fecharmsg.onclick = () => {
        p.innerHTML = "";
        p.remove();
        imensagem.classList.add("ocultar_mensagem");
    };
}

export function mensagemErro(texto) {
    const conteudo = container_mensagem.querySelector("div");
    if (!conteudo) {
        const div = document.createElement("div");
        div.setAttribute("class", "erro")
        div.textContent = texto;
        container_mensagem.appendChild(div);

        setInterval(() => {
            div.remove();
        }, 2000)
    }
}

export function mensagemSucessso(texto) {
    const conteudo = container_mensagem.querySelector("div");
    if (!conteudo) {
        const div = document.createElement("div");
        div.setAttribute("class", "sucesso");
        div.textContent = texto;
        container_mensagem.appendChild(div);

        setInterval(() => {
            div.remove();
        }, 2000)
    }
}
