import {Request, Response, NextFunction} from 'express';


export function ensureAdmin(request: Request, response: Response, next: NextFunction){
    //verifica usuario admin
    const admin = false;
    if(admin){
      return next();
    }

    //se nao for admin, retorna a mensagem
    return response.status(401).json({
      error: "Unauthorized",
    })
}