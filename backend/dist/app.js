"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
/*router*/
const router_instituicao_1 = require("./routes/router.instituicao");
const router_livro_1 = require("./routes/router.livro");
const router_aluno_1 = require("./routes/router.aluno");
const router_emprestimo_1 = require("./routes/router.emprestimo");
/*controller*/
const ControllerInstituicao_1 = require("./controllers/ControllerInstituicao");
const ControllerLivro_1 = require("./controllers/ControllerLivro");
const ControllerAluno_1 = require("./controllers/ControllerAluno");
const ControllerEmprestimo_1 = require("./controllers/ControllerEmprestimo");
/*service*/
const ServiceInstituicao_1 = require("./services/ServiceInstituicao");
const ServiceLivro_1 = require("./services/ServiceLivro");
const ServiceAluno_1 = require("./services/ServiceAluno");
const ServiceEmprestimo_1 = require("./services/ServiceEmprestimo");
const app = (0, express_1.default)();
/*instancias services*/
const service_intituicao = new ServiceInstituicao_1.ServiceInstituicao();
const service_livro = new ServiceLivro_1.ServiceLivro();
const service_aluno = new ServiceAluno_1.ServiceAluno();
const service_emprestimo = new ServiceEmprestimo_1.ServiceEmprestimo();
/*instancias controller + injeção*/
const controller_intituicao = new ControllerInstituicao_1.InstituicaoController(service_intituicao);
const controller_livro = new ControllerLivro_1.LivroController(service_livro);
const controller_aluno = new ControllerAluno_1.AlunoController(service_aluno);
const controller_emprestimo = new ControllerEmprestimo_1.EmprestimoController(service_emprestimo);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/*uses*/
app.use("/instituicao", (0, router_instituicao_1.routerInstituicao)(controller_intituicao));
app.use("/livro", (0, router_livro_1.routerLivro)(controller_livro));
app.use("/aluno", (0, router_aluno_1.routerAluno)(controller_aluno));
app.use("/emprestimo", (0, router_emprestimo_1.routerEmprestimo)(controller_emprestimo));
app.use(errorHandler_1.errorHandler);
exports.default = app;
