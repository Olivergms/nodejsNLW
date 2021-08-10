import {Request, Response}  from 'express';
import {CreateTagService} from '../services/CreateTagsService';

class CreateTagController{
  async handle(request: Request, response: Response){
    const {name} = request.body;

    const createTagService = new CreateTagService();
    //faz a verificação no nome da tag
    const tag  = await createTagService.execute(name);
    
    return response.json(tag)
  }
}

export {CreateTagController}