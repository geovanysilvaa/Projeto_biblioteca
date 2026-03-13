import { Router } from "express"
import { LivroController } from "../../src/controllers/ControllerLivro";

export function routerLivro(controllerlivro: LivroController) {

    const router = Router();

    router.post("/cadastrar", controllerlivro.cadastrarLivro);
    router.get("/", controllerlivro.listarTodos);
    router.get("/:id", controllerlivro.listarId);
    router.put("/:id", controllerlivro.atualizarLivro);
    router.delete("/:id", controllerlivro.delete);

    return router;
}