import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler"


/*router*/
import { routerInstituicao } from "./routes/router.instituicao";
import { routerLivro } from "./routes/router.livro";
import { routerAluno } from "./routes/router.aluno";
import { routerEmprestimo } from "./routes/router.emprestimo";


/*controller*/
import { InstituicaoController } from "./controllers/ControllerInstituicao";
import { LivroController } from "./controllers/ControllerLivro";
import { AlunoController } from "./controllers/ControllerAluno";
import { EmprestimoController } from "./controllers/ControllerEmprestimo";


/*service*/
import { ServiceInstituicao } from "./services/ServiceInstituicao";
import { ServiceLivro } from "./services/ServiceLivro";
import { ServiceAluno } from "./services/ServiceAluno";
import { ServiceEmprestimo } from "./services/ServiceEmprestimo";


const app = express();

/*instancias services*/
const service_intituicao = new ServiceInstituicao();
const service_livro = new ServiceLivro();
const service_aluno = new ServiceAluno();
const service_emprestimo = new ServiceEmprestimo();


/*instancias controller + injeção*/
const controller_intituicao = new InstituicaoController(service_intituicao);
const controller_livro = new LivroController(service_livro);
const controller_aluno = new AlunoController(service_aluno);
const controller_emprestimo = new EmprestimoController(service_emprestimo);

app.use(express.json());
app.use(cors());


/*uses*/
app.use("/instituicao", routerInstituicao(controller_intituicao));
app.use("/livro", routerLivro(controller_livro));
app.use("/aluno", routerAluno(controller_aluno));
app.use("/emprestimo",routerEmprestimo(controller_emprestimo));


app.use(errorHandler)

export default app;