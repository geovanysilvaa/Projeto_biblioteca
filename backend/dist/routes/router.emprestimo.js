"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEmprestimo = routerEmprestimo;
const express_1 = require("express");
function routerEmprestimo(controllerEmprestimo) {
    const router = (0, express_1.Router)();
    router.post("/faseremprestimo", controllerEmprestimo.novoEmprestimo);
    router.get("/", controllerEmprestimo.listarEmprestimos);
    router.get("/:id", controllerEmprestimo.listarEmprestimoId);
    router.put("/:id", controllerEmprestimo.atualizarEmprestimo);
    router.delete("/:id", controllerEmprestimo.delete);
    return router;
}
