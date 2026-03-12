import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler"

/*routes*/
import { routerInstituicao } from "./routes/router.instituicao";


/*constroller*/
import { InstituicaoController } from "./controllers/ControllerInstituicao";


/*service*/
import { ServiceInstituicao } from "./services/ServiceInstituicao";


const app = express();

/*instancias services*/
const service_intituicao = new ServiceInstituicao();


/*instancias controller + injeção*/
const controller_intituicao = new InstituicaoController(service_intituicao);


app.use(express.json());
app.use(cors());


/*uses*/
app.use("/instituicao", routerInstituicao(controller_intituicao));


app.use(errorHandler)

export default app;