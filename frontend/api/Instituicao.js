import { mostrarMensagem } from "../js/utilitarios.js";

/*Função responsavel por enviar requisição para API - (Login da Intituição)*/

const UrlLogin = "http://localhost:3000/instituicao/login";

export async function LoginInstituicao(dados) {

    const resposta = await fetch(UrlLogin, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(dados)
    });

    try {

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.message)
        } else {
            mostrarMensagem("sucesso", "Login realizado com Sucesso!")

            setTimeout(() => {
                window.location.href = "../telaInicio/Home.html";
            }, 3000);
        }

    } catch (error) {
        mostrarMensagem("erro", error.message + "!");
    }
}

/*Função responsavel por enviar requisição para API - (Cadastro de Intituição)*/

const UrlCadastro = "http://localhost:3000/instituicao/cadastro";

export async function CadastrarInstituicao(dados01) {
    const resposta = await fetch(UrlCadastro, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(dados01)
    });


    try {

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.message)
        } else {
            mostrarMensagem("sucesso", "Cadastro realizado com Sucesso!")

            setTimeout(() => {
                window.location.href = "../telaInicio/pages/login/Telalogin.html"
            }, 4000);
        }

    } catch (error) {
        mostrarMensagem("erro", error.message);
    }
}
