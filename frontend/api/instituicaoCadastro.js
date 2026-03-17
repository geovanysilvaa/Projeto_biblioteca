const endpointInstituicao = "http://localhost:3000/instituicao/cadastro";
const endpointInstituicaoLogin = "http://localhost:3000/instituicao/login";
const imensagem = document.querySelector("#imensagem");

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
        const div = document.createElement("div");
        div.innerHTML = info.message;
        imensagem.appendChild(div);
    } else {
        const div = document.createElement("div");
        div.innerHTML = info.message;
        imensagem.appendChild(div);
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
        const div = document.createElement("div");
        div.setAttribute("id","msg_amostra");
        div.innerHTML = info.message;
        imensagem.appendChild(div);
    } else {
        const div = document.createElement("div");
        div.innerHTML = info.mensagem;
        imensagem.appendChild(div);
    }
}