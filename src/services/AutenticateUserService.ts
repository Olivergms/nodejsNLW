import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from 'bcryptjs';
//importa o sign para gerar token
import {sign} from 'jsonwebtoken';



interface IAutenticateRequest{
  email: string;
  password: string;
}

class AutenticateUserService{
  async execute({email, password}: IAutenticateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);

    //verifica se email existe
    const user = await usersRepositories.findOne({email});

    if(!user){
      throw new Error("Email/password incorrect");
    }
    //compara senha e retorna boolean
    const passwordMAtch = await compare(password, user.password);

    //se for false, retorna o erro
    if(!passwordMAtch){
      throw new Error("Email/password incorrect");
    }
    
    const token = sign({
      email: user.email
    }, "135e2f1056f4bcc98d9a58b40ac36c61", {
      subject: user.id,
      //tempo do token 
      expiresIn: "1d"
    });

    return token;
  }
}

export {AutenticateUserService};