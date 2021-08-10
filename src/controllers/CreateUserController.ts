import {Request, Response} from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController{
  //metodo recebe req e res
  async handle(request: Request, response: Response){

    
        //filtra nome, email, admin da requisição
      const {name, email, admin, password} = request.body;
        //cria o objeto exportado do service
      const createUserService = new CreateUserService();
        //executa o metodo de validação
      const user = await createUserService.execute({name, email, admin, password});
        //retorna o objeto em json
        
      return response.json(user);
   
  }
}
//exporta a classe
export {CreateUserController};