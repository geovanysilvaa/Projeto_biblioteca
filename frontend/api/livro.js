const endpointLivro = "http://localhost:3000/livro";
const endpointLivroDelete = "http://localhost:3000/livro/";

const lista_livro = document.querySelector("#lista_livro");

async function deletarLivro(id) {
    const resposta = await fetch(endpointLivroDelete + `${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (resposta.ok) {
        return true;
    } else {
        return false;
    }

}

export async function listarLivro() {
    const resposta = await fetch(endpointLivro);

    const info = await resposta.json();
    const dados = [...info.dados];

    info.dados.map((elemento) => {
        const divconteiner = document.createElement("div");
        divconteiner.setAttribute("class", "lista_livro")
        lista_livro.appendChild(divconteiner);

        const corpo_livro = document.createElement("div");
        corpo_livro.setAttribute("class", "corpo_livro");
        divconteiner.appendChild(corpo_livro);

        const fundo_livro = document.createElement("div");
        fundo_livro.setAttribute("class", "fundo_livro");
        corpo_livro.appendChild(fundo_livro);


        /* rodape */
        const rodape_livro = document.createElement("div");
        rodape_livro.setAttribute("class", "rodape_livro");
        corpo_livro.appendChild(rodape_livro);

        const botao_editar = document.createElement("button");
        botao_editar.setAttribute("class", "btn_editar");
        rodape_livro.appendChild(botao_editar);

        const imgeditar = document.createElement("img");
        imgeditar.setAttribute("src", "../icons/iconEditar.png")
        botao_editar.appendChild(imgeditar);


        const botao_delete = document.createElement("button");
        botao_delete.setAttribute("class", "btn_deletar");
        botao_delete.setAttribute("id", elemento.id);
        rodape_livro.appendChild(botao_delete);

        botao_delete.addEventListener("click", async (evento) => {
            const id = evento.currentTarget.id;

            
            const card = evento.currentTarget.closest(".corpo_livro");
            const sucesso = await deletarLivro(id);

            if (sucesso && card) {
                card.remove();
            }
        });

        const imgdeletar = document.createElement("img");
        imgdeletar.setAttribute("src", "../icons/iconDelete.png")
        botao_delete.appendChild(imgdeletar);
        /*********/

        const pnome = document.createElement("p");
        pnome.innerHTML = `Nome:${elemento.nome}`;
        fundo_livro.appendChild(pnome);

        const pautor = document.createElement("p");
        pautor.innerHTML = `Autor:${elemento.autor}`;
        fundo_livro.appendChild(pautor);

        const pquantidade = document.createElement("p");
        pquantidade.innerHTML = `Quantidade:${elemento.quantidade}`;
        fundo_livro.appendChild(pquantidade);

        const pcategoria = document.createElement("p");
        pcategoria.innerHTML = `Categoria:${elemento.categoria}`;
        fundo_livro.appendChild(pcategoria);

        const pano = document.createElement("p");
        pano.innerHTML = `Ano:${elemento.ano}`;
        fundo_livro.appendChild(pano);
    });
}