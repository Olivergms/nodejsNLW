import {Request, Response} from "express"
import { AutenticateUserService } from "../services/AutenticateUserService";

class AutenticateUserController{
  async handle(request: Request, response: Response){
     const { email, password} = request.body;


    const autenticaUserService = new AutenticateUserService();

    const token = await autenticaUserService.execute({
      email,
      password
    });

    return response.json(token);

  }

}

export {AutenticateUserController}