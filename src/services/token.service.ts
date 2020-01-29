
import { getCustomRepository } from 'typeorm';
import { TokenRepository } from '../repository/token.repository';
import { Token } from '../entity/token.entity';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class TokenService {

  protected repository = getCustomRepository(TokenRepository);

  create(token: Token) {
    token = this.repository.create(token);
    return this.repository.save(token);
  }

  getByValue(value: string) {
    return this.repository.findOne({value}, {relations : ['user']});
  }

}
