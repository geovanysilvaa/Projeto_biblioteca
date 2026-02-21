import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler"
import { routerIntituicao } from "./routes/router.intituicao";

import { InstituicaoController } from "./controllers/ControllerInstituicao";

import { ServiceInstituicao } from "./services/ServiceInstituicao";

const app = express();


const service_intituicao = new ServiceInstituicao();
const controller_intituicao = new InstituicaoController(service_intituicao);


app.use(express.json());
app.use(cors());

app.use("/instituicao", routerIntituicao(controller_intituicao));

app.use(errorHandler)

export default app;