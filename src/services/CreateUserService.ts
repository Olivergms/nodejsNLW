import { getCustomRepository} from 'typeorm';
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from 'bcryptjs';


//cria uma interface para validação
interface IUserRequest{
  name: string,
  email: string,
  admin?: boolean
  password: string
}
class CreateUserService{
  //extrai os campos, caso o admin não seja preenchido, receberá false como default
  async execute( {name, email, admin = false, password}: IUserRequest){
    //recebe a instancia da classe UsersRepositories
    const usersRepository = getCustomRepository(UsersRepositories);

    //verifica se o email é nulo
    if(!email){
      throw new Error("Email incorrect"); 
    }
    //verifica se o email existe no banco
    const userAlreadyExists = await usersRepository.findOne({
      email
    });
    //se existir, lança um erro
    if(userAlreadyExists){
      throw new Error("User already exists"); 
    }

    //criptografa a senha
    const passwordHash = await hash(password, 8);
    
    //monta a query de insert
    const user = usersRepository.create({
      name, 
      email,
      admin,
      password: passwordHash
    });

    //aguarda a inserção dos registros no banco
    await usersRepository.save(user);
    //retorna o objeto
    return user;
  }
}
//exporta a classe
export { CreateUserService }