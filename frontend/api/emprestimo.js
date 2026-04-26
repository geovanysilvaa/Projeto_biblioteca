/* imports */
import { CaixaMsg } from "../componentes/mensagem.js";

/* endpoints */
const endpointCadastrarEmprestimo = "http://localhost:3000/emprestimo/fazeremprestimo";
const endpointListaEmprestimo = "http://localhost:3000/emprestimo";
const endpointEmprestimoId = "http://localhost:3000/emprestimo";
const endpointUpdateEmprestimo = "http://localhost:3000/emprestimo";
const endpointDeleteEmprestimo = "http://localhost:3000/emprestimo";

export async function cadastrarEmprestimo(dados) {
    const resposta = await fetch(endpointCadastrarEmprestimo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const info = await resposta.json();

    if (info.sucesso) {
        let msg = new CaixaMsg('ok', 'Alerta', info.mensagem);
        msg.monstrar();
    } else {
        let msg = new CaixaMsg('ok', 'Alerta', info.message);
        msg.monstrar();
    }
}

export async function listarEmprestimos() {
    try {
        const resposta = await fetch(endpointListaEmprestimo);
        const info = await resposta.json();

        if (!resposta.ok) {
            throw new Error(info.message);
        } else {
            return info;
        }
    } catch (error) {
        let msg = new CaixaMsg('ok', 'Alerta', error);
        msg.monstrar();
    }
}

export async function listarEmprestimoId(id) {
    return fetch(endpointEmprestimoId + `/${id}`)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

export async function updateEmprestimo(id, dados) {
    const resposta = await fetch(endpointUpdateEmprestimo + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const info = await resposta.json();

    if (info.sucesso) {
        let msg = new CaixaMsg('ok', 'Alerta', info.mensagem);
        msg.monstrar();
    } else {
        let msg = new CaixaMsg('ok', 'Alerta', info.message);
        msg.monstrar();
    }
}

export async function deletarEmprestimo(id) {
    const resposta = await fetch(endpointDeleteEmprestimo + `/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const info = await resposta.json();

    if (info.sucesso) {
        let msg = new CaixaMsg('ok', 'Alerta', info.mensagem);
        msg.monstrar();
    } else {
        let msg = new CaixaMsg('ok', 'Alerta', info.message);
        msg.monstrar();
    }
}
