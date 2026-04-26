export class CaixaMsg {

    tipo = null;
    titulo = null;
    discricao = null;
    fundo_msg = document.getElementById("mensagem");

    constructor(tipo, titulo, discricao) {

        this.tipo = tipo;
        this.titulo = titulo;
        this.discricao = discricao;

    }

    monstrar() {

        if (this.tipo == "ok") {

            const div_fundo_msg = document.createElement("div");
            div_fundo_msg.setAttribute("class", "div_fundo_msg");

            const div_corpo = document.createElement("div");
            div_corpo.setAttribute("class", "div_corpo_mg");

            /**/
            const div_titulo = document.createElement("div");
            div_titulo.setAttribute("class", "div_titulo");

            const div_button = document.createElement("div");
            div_button.setAttribute("class", "div_button");
            div_button.textContent = this.titulo

            const button_x = document.createElement("button");
            button_x.setAttribute("class", "button_x");
            button_x.innerHTML = "x"

            button_x.addEventListener("click", () => {
                this.ocultar();
            })

            const div_meio = document.createElement("div");
            div_meio.setAttribute("class", "div_meio");
            div_meio.innerHTML = this.discricao;


            const div_rodape = document.createElement("div");
            div_rodape.setAttribute("class", "div_rodape");

            const div_button_ok = document.createElement("div");
            div_button_ok.setAttribute("class", "div_button_ok");

            const button_ok = document.createElement("button");
            button_ok.setAttribute("class", "button_ok");
            button_ok.innerHTML = "ok"
            button_ok.addEventListener("click", () => {
                this.ocultar();
            })

            div_button_ok.appendChild(button_ok);
            div_rodape.appendChild(div_button_ok)
            div_button.appendChild(button_x);
            div_titulo.appendChild(div_button);
            div_corpo.append(div_titulo, div_meio, div_rodape);

            div_fundo_msg.appendChild(div_corpo)
            this.fundo_msg.appendChild(div_fundo_msg);

        } else if (this.tipo == "sn") {
            return new Promise((resolve, reject) => {

                let resultado = null;

                const div_fundo_msg = document.createElement("div");
                div_fundo_msg.setAttribute("class", "div_fundo_msg");

                const div_corpo = document.createElement("div");
                div_corpo.setAttribute("class", "div_corpo_mg");

                /**/
                const div_titulo = document.createElement("div");
                div_titulo.setAttribute("class", "div_titulo");

                const div_button = document.createElement("div");
                div_button.setAttribute("class", "div_button");
                div_button.textContent = this.titulo

                const button_x = document.createElement("button");
                button_x.setAttribute("class", "button_x");
                button_x.innerHTML = "x"

                button_x.addEventListener("click", () => {
                    this.ocultar();
                })

                const div_meio = document.createElement("div");
                div_meio.setAttribute("class", "div_meio");
                div_meio.innerHTML = this.discricao;


                const div_rodape = document.createElement("div");
                div_rodape.setAttribute("class", "div_rodape");

                const div_button_sim = document.createElement("div");
                div_button_sim.setAttribute("class", "div_button_sim");

                const button_nao = document.createElement("button");
                button_nao.setAttribute("class", "button_ok");
                button_nao.innerHTML = "não"
                button_nao.addEventListener("click", () => {
                    resolve(false);
                    this.ocultar();
                })

                const button_ok = document.createElement("button");
                button_ok.setAttribute("class", "button_ok");
                button_ok.innerHTML = "sim"
                button_ok.addEventListener("click", () => {
                    resolve(true);
                    this.ocultar();
                })

                div_button_sim.appendChild(button_ok);
                div_button_sim.appendChild(button_nao);
                div_rodape.appendChild(div_button_sim);
                div_button.appendChild(button_x);
                div_titulo.appendChild(div_button);
                div_corpo.append(div_titulo, div_meio, div_rodape);

                div_fundo_msg.appendChild(div_corpo)
                this.fundo_msg.appendChild(div_fundo_msg);
            });
        }
    }
    ocultar() {
        this.fundo_msg.innerHTML = "";
    }
}
