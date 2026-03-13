import { Router } from "express"
import { AlunoController } from "../controllers/ControllerAluno";

export function routerAluno(constrolleAluno:AlunoController){

    let router = Router();


    router.post("/cadastrar",constrolleAluno.cadastrarAluno);
    router.get("/:id",constrolleAluno.listarAlunoId);
    router.get("/",constrolleAluno.listarAlunos);
    router.put("/:id",constrolleAluno.atualizarAluno);
    router.delete("/:id",constrolleAluno.delete);

    return router;
}