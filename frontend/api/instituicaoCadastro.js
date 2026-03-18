const endpointInstituicao = "http://localhost:3000/instituicao/cadastro";
const endpointInstituicaoLogin = "http://localhost:3000/instituicao/login";

const conteiner_mensagem = document.querySelector("#imensagem");

function mensagemErro(texto) {
    const conteudo = conteiner_mensagem.querySelector("div");
    if(!conteudo){
        const div = document.createElement("div");
        div.setAttribute("class","erro")
        div.textContent = texto;
        conteiner_mensagem.appendChild(div);

        setInterval(()=>{
            div.remove();
        },2000)
    }
}

function mensagemSucessso(texto) {
    const conteudo = conteiner_mensagem.querySelector("div");
    if(!conteudo){
        const div = document.createElement("div");
        div.setAttribute("class","sucesso");
        div.textContent = texto;
        conteiner_mensagem.appendChild(div);

        setInterval(()=>{
            div.remove();
        },2000)
    }
}

export async function cadastroIntituicao(dados01) {
    const resposta = await fetch(endpointInstituicao, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados01)
    });

    let info = await resposta.json();

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

    let info = await resposta.json();

    if (!info.sucesso) {
        mensagemErro(info.message);
    } else {
        mensagemSucessso(info.mensagem);
        window.location.href ="../paginas/telaInicio.html";
    }
}
