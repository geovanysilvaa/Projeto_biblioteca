/* imports */
import { CaixaMsg } from "../componentes/mensagem.js";

/* endpoints */
const endpointCadastraAluno = "http://localhost:3000/aluno/cadastrar";
const endpointListaAlunos = "http://localhost:3000/aluno";
const endpointAlunoId = "http://localhost:3000/aluno";
const endpointUpdateAluno = "http://localhost:3000/aluno";
const endpointDeleteAluno = "http://localhost:3000/aluno";

export async function cadastrarAluno(dados) {
    const resposta = await fetch(endpointCadastraAluno, {
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

export async function listarAlunos() {
    try {
        const resposta = await fetch(endpointListaAlunos);
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

export async function listarAlunoId(id) {
    return fetch(endpointAlunoId + `/${id}`)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

export async function updateAluno(id, dados) {
    const resposta = await fetch(endpointUpdateAluno + `/${id}`, {
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

export async function deletarAluno(id) {
    const resposta = await fetch(endpointDeleteAluno + `/${id}`, {
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
