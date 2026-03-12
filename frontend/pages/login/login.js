import { LoginInstituicao } from "../../api/Instituicao.js";
import { mostrarMensagem } from "../../js/utilitarios.js";



const btn_login = document.getElementById("btn_login");

btn_login.addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        mostrarMensagem("erro", "Preecha todo os campos!");
        return;
    }

    let dados = {
        email: email,
        senha: senha
    }

    LoginInstituicao(dados);
})


