import {Router} from "express";
import {CreateUserController} from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AutenticateUserController } from "./controllers/AtenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();
//cria um objeto do tipo controller
const createUserController = new CreateUserController(); 
const createTagController = new CreateTagController();
const autenticateUserController = new AutenticateUserController();
const createcomplimentsController = new CreateComplimentController();

//a rota encaminha a requisição para o controller
router.post("/users", createUserController.handle);
//utlizando o middleware de autenticação entre rota e controller
router.post("/tags", ensureAuthenticated, ensureAdmin ,createTagController.handle);
//rota de login, gera o token para o usuario
router.post("/login", autenticateUserController.handle);
//rota de compliments
router.post("/compliments", createcomplimentsController.handle);

//exporta a rota
export {router};