import { RepresentationRepository } from '../repository/representation.repository';
import { getCustomRepository } from 'typeorm';
import { Representation } from 'src/entity/representation.entity';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class RepresentationService {

    private repository = getCustomRepository(RepresentationRepository);

    // Business logic
    async getAll() {
        return await this.repository.find();
    }

    async getForAllMember() {
        return await this.repository.find({ where: { forMember: false } });
    }

    async create(representation: any) {
        representation = this.repository.create(representation);
        return await this.repository.save(representation);
    }

    async update(representation: Representation, id: number) {
        return await this.repository.update(id, representation);
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }

}
