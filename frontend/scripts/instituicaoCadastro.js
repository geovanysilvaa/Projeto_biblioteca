/* imports */
import { cadastroIntituicao } from "../api/instituicaoCadastro.js";

/* Botões */

const btn_cadastro = document.querySelector("#btn_cadastro");
console.log(btn_cadastro)

/* Evento */

btn_cadastro.addEventListener("click", () => {
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


