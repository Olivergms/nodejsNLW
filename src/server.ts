import "reflect-metadata";
import express, {Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import {router} from './routes';
import "./database";


const app = express();
//habilitando o json
app.use(express.json()) 
//usa as rotas
app.use(router); 


//faz a verificação de possiveis erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
  if(err instanceof Error){
    return response.status(400)
    .json({error: err.message});
  }
  return response.status(500)
  .json({
    Status: "error",
    message: "Internal server error"
  })
});

//inicia o servidor
app.listen(3001, () => console.log("Server is running on port: 3001"));