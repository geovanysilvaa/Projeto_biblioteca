import { CadastrarInstituicao } from "../../api/Instituicao.js";
import { mostrarMensagem } from "../../js/utilitarios.js";


const btn_cadastro = document.getElementById("btn_cadastro");

btn_cadastro.addEventListener("click", () => {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;


    if (!nome || !email || !senha) {
        mostrarMensagem("error", "Preencha todos os campos!");
        return;
    }
    let dados = {
        nome: nome,
        email: email,
        senha: senha
    }

    CadastrarInstituicao(dados);
});

