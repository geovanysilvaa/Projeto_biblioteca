/* imports */
import { mensagemErro,mensagemSucessso } from "../componentes/mensagem.js";

/* endpoint */
const endpointCadastrarInstituicao = "http://localhost:3000/instituicao/cadastro";
const endpointInstituicaoLogin = "http://localhost:3000/instituicao/login";


export async function cadastroIntituicao(dados01) {
    const resposta = await fetch(endpointCadastrarInstituicao, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados01)
    });

    const info = await resposta.json();
   
    if (!info.sucesso) {
        mensagemErro(info.message);
    } else {
        mensagemSucessso(info.mensagem);
    }
}

export async function loginIntituicao(dados02) {
    const resposta = await fetch(endpointInstituicaoLogin, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados02)
    });

    const info = await resposta.json();

    if (!info.sucesso) {
        mensagemErro(info.message);
    } else {
        localStorage.setItem("id",info.dados.id)
        mensagemSucessso(info.mensagem);
        window.location.href ="../paginas/telaInicio.html";
    }
}
