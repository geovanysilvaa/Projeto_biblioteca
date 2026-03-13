import { Router } from "express";
import { EmprestimoController } from "../controllers/ControllerEmprestimo";

export function routerEmprestimo(controllerEmprestimo: EmprestimoController) {
    const router = Router();

    router.post("/faseremprestimo", controllerEmprestimo.novoEmprestimo);
    router.get("/", controllerEmprestimo.listarEmprestimos);
    router.get("/:id", controllerEmprestimo.listarEmprestimoId);
    router.put("/:id", controllerEmprestimo.atualizarEmprestimo);
    router.delete("/:id", controllerEmprestimo.delete);

    return router;
}












