"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const router_intituicao_1 = require("./routes/router.intituicao");
const ControllerInstituicao_1 = require("./controllers/ControllerInstituicao");
const ServiceInstituicao_1 = require("./services/ServiceInstituicao");
const app = (0, express_1.default)();
const service_intituicao = new ServiceInstituicao_1.ServiceInstituicao();
const controller_intituicao = new ControllerInstituicao_1.InstituicaoController(service_intituicao);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/instituicao", (0, router_intituicao_1.routerIntituicao)(controller_intituicao));
app.use(errorHandler_1.errorHandler);
exports.default = app;
