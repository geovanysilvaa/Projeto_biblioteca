/* imports */
import { cadastroIntituicao } from "../api/instituicaoCadastro.js";

/* Botões */
const formulario_cadastro = document.querySelector("#formulario_cadastro");

/* Evento */
formulario_cadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("#inome").value;
    const email = document.querySelector("#iemail").value;
    const senha = document.querySelector("#isenha").value;

    let dados = {
        nome: nome,
        email: email,
        senha: senha
    }
    
    cadastroIntituicao(dados);
});