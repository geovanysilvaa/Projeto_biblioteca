"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAluno = routerAluno;
const express_1 = require("express");
function routerAluno(constrolleAluno) {
    let router = (0, express_1.Router)();
    router.post("/cadastrar", constrolleAluno.cadastrarAluno);
    router.get("/:id", constrolleAluno.listarAlunoId);
    router.get("/", constrolleAluno.listarAlunos);
    router.put("/:id", constrolleAluno.atualizarAluno);
    router.delete("/:id", constrolleAluno.delete);
    return router;
}
