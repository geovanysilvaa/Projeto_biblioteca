import { Router } from "express"
import { InstituicaoController } from "../controllers/ControllerInstituicao"

/*Testado*/
export function routerInstituicao(controllerinstituicao: InstituicaoController) {

    const router = Router();

    router.post("/login", controllerinstituicao.login);
    router.post("/cadastro", controllerinstituicao.cadastrar);
    router.get("/", controllerinstituicao.listar);
    router.get("/:id", controllerinstituicao.listaID);
    router.put("/:id", controllerinstituicao.update)
    router.delete("/:id", controllerinstituicao.delete);

    return router;
}