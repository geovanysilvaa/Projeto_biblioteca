import { mostrarMensagem } from "./utilitarios.js";

/**Botões*/
const btn_cadastrar_livro = document.querySelector("#btn_cadastrar_livro");

/*Dialogo*/
const dialogo_cadastro = document.querySelector("#dialogo_cadastro");


/*Eventos*/

/*Evento de diaologo de cadastro de livros*/

btn_cadastrar_livro.addEventListener("click", () => {

    if(!dialogo_cadastro.querySelector("#dialogo_cadastro")){
        const div = document.createElement("div");

        div.classList.add("dialogo_cadastro");

        div.innerHTML = `
         <form class="dialogo">
            <label for="inome">Nome:</label>
            <input type="text" name="nome" id="inome">
            <br>
            <label for="iautor">Autor:</label>
            <input type="text" name="autor" id="iautor">
    
            <button>Cadastrar</button>
         </form>
        `;

        dialogo_cadastro.appendChild(div);
    }else{
        mostrarMensagem("error","erro.")
    }
});
