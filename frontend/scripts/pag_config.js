import { UpdateConfig } from "../api/instituicaoCadastro.js"
import { CaixaMsg } from "../componentes/mensagem.js";


const inome = document.querySelector("#cnome");
const iemail = document.querySelector("#cemail");
const isenha = document.querySelector("#csenha");

const form_configuracao = document.querySelector("#form_configuracao");
const btn_configuracao = document.querySelector("#btn_configuracao");


form_configuracao.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!inome.value || !iemail.value || !isenha.value) {
        let msg = new CaixaMsg('ok','Alert', 'Preencha todos os campos.')
        msg.monstrar();
        return;
    }

    let dados = {
        nome: inome.value,
        email: iemail.value,
        senha: isenha.value
    }

    UpdateConfig(dados);
    form_configuracao.reset();
});
