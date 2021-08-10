import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositores"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string; 
}

class CreateComplimentService{
  async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
      const complimentsRepositores = getCustomRepository(ComplimentsRepositories);
      const userRepositores =  getCustomRepository(UsersRepositories);

      //verifica se o usuario sender é o mesmo receiver
      if(user_sender === user_receiver){ 
        throw new Error("Incorrect user receiver");
      }
      //verifica se o usuario receiver exist
      const userReceiverExists = await  userRepositores.findOne(user_receiver);

      if(!userReceiverExists){
        throw new Error("User receiver does not exists");
      }

      //gera a query de insert
      const compliment = complimentsRepositores.create({ 
        tag_id,
        user_receiver,
        user_sender,
        message
      });
      //insere no banco
      await complimentsRepositores.save(compliment);

      return compliment;
  }
}

export {CreateComplimentService}