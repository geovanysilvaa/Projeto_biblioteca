/* imports */
import { loginIntituicao } from "../api/instituicaoCadastro.js";

/* Formularios */
const formulario_login = document.querySelector("#formulario_login");

/* Evento */
formulario_login.addEventListener("submit",(evento)=>{
    evento.preventDefault();

    const email = document.querySelector("#lemail").value;
    const senha = document.querySelector("#lsenha").value;
    
    let dados = {
        email: email,
        senha: senha
    }
    
    loginIntituicao(dados);
});