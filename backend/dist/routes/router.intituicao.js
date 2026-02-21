"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerIntituicao = routerIntituicao;
const express_1 = require("express");
function routerIntituicao(controllerinstituicao) {
    const router = (0, express_1.Router)();
    router.post("/login", controllerinstituicao.login);
    router.post("/cadastro", controllerinstituicao.cadastrar);
    router.get("/", controllerinstituicao.listar);
    router.get("/:id", controllerinstituicao.listaID);
    router.put("/:id", controllerinstituicao.update);
    router.delete("/:id", controllerinstituicao.delete);
    return router;
}
