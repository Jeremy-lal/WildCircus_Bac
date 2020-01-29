import { Representation } from './../entity/representation.entity';
import {EntityRepository, Repository} from 'typeorm';
/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requete sql)
 */

@EntityRepository(Representation)
export class RepresentationRepository extends Repository<Representation> {

}
