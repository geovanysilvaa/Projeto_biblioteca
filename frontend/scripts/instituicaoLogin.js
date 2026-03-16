/* imports */
import { loginIntituicao } from "../api/instituicaoCadastro.js";

const btn_login = document.querySelector("#btn_login");

btn_login.addEventListener("click",()=>{
    const email = document.querySelector("#lemail").value;
    const senha = document.querySelector("#lsenha").value;
    
    let dados = {
        email: email,
        senha: senha
    }
    loginIntituicao(dados);

});