"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerLivro = routerLivro;
const express_1 = require("express");
function routerLivro(controllerlivro) {
    const router = (0, express_1.Router)();
    router.post("/cadastrar", controllerlivro.cadastrarLivro);
    router.get("/", controllerlivro.listarTodos);
    router.get("/:id", controllerlivro.listarId);
    router.put("/:id", controllerlivro.atualizarLivro);
    router.delete("/:id", controllerlivro.delete);
    return router;
}
