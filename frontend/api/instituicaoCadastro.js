/* imports */
import { CaixaMsg } from "../componentes/mensagem.js";

/* endpoints */
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
        let msg = new CaixaMsg('ok', 'Alerta', info.message);
        msg.monstrar();
    } else {
        let msg = new CaixaMsg('ok', 'Alerta', info.mensagem);
        msg.monstrar();
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
    console.log(info)

    if (!info.sucesso) {
        let msg = new CaixaMsg('ok', 'Alerta', info.message);
        msg.monstrar();
    } else {
        let msg = new CaixaMsg('ok', 'Alerta', info.mensagem);
        msg.monstrar();
        localStorage.setItem("id", info.dados.id)

        setInterval(() => {
            window.location.href = "../paginas/telaInicio.html";
        }, 2000);
    }
}

export async function UpdateConfig(dados) {
    let id = localStorage.getItem("id");
    const endpointInstituicaoUpdate = `http://localhost:3000/instituicao/${id}`;
    let cabesalho = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    };
    fetch(endpointInstituicaoUpdate, cabesalho)
        .then(res => res.json())
        .then(info => {
            // console.log(info)
            if (info.sucesso) {
                let msg = new CaixaMsg('ok', 'Alerta', info.mensagem);
                msg.monstrar();
            } else {
                let msg = new CaixaMsg('ok', 'Alerta', info.message);
                msg.monstrar();
            }
        })
        .catch(erro => {
            let msg = new CaixaMsg('ok', 'Alerta', erro);
            msg.monstrar();
        });
}
