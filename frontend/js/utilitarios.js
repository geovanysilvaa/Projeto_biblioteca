/**
 * Função de tratamento de mensagens
*/

export function mostrarMensagem(tipo, mensagem) {
    const conteiner = document.getElementById("mensagem");

    if (tipo == "sucesso") {
        
        const div = document.createElement("div")

        div.setAttribute("class", "mensagemSucesso")
        div.innerHTML = mensagem
        conteiner.appendChild(div)

        setTimeout(() => {
            div.remove();
        }, 2000)

    } else {

        const div = document.createElement("div")

        div.setAttribute("class", "mensagemErro")
        div.innerHTML = mensagem
        conteiner.appendChild(div)

        setTimeout(() => {
            div.remove();
        }, 2000)
    }
}

/***/