import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
){
  //pega o token
  const authToken = request.headers.authorization;
  //se ele não existir
  if(!authToken){
    return response.status(401).json({ message: "toekn missing"});
  } 
  //separa a string pelo espaço, pega a segunda posição do vetor
  // e salva na variavel token
  const [,token] = authToken.split(" ");

  //verifica se é um token valido
  try{
    const decode = verify(token,"135e2f1056f4bcc98d9a58b40ac36c61");
    console.log(decode);
    
  }catch(err){
    return response.status(401).end();  
  }

  return next();
}