import {getCustomRepository} from 'typeorm';
import {TagsRepositories} from '../repositories/TagsRepositories';


class CreateTagService {
  async execute(name: string){
    //cria um novo objeto do tipo tagsrep... Sendo customizado, requer o getcustom...
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if(!name){
      throw new Error("Incorrect name!");
    }
    //faz uma busca no banco de dados e armazena na variavel
    //retorna true ou false
    const tagAlreadyExists = await tagsRepositories.findOne({
      name
    })

    //se existir, joga um erro
    if(tagAlreadyExists){
      throw new Error("Tag already exists!")
    }

    //monta a query de insert
    const tag = tagsRepositories.create({
      name
    });
    //insere no banco
    await tagsRepositories.save(tag);

    return tag;
  }
}

export {CreateTagService}