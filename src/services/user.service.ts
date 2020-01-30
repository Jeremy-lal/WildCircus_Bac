import { RepresentationRepository } from './../repository/representation.repository';
import { User } from './../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class UserService {

    private repository = getCustomRepository(UserRepository);
    private repreRepository = getCustomRepository(RepresentationRepository);

    // Business logic
    async getAll() {
        return await this.repository.find({ relations: ['representations'] });
    }

    async getById(id: number) {
        return await this.repository.findOne(id, { relations: ['representations'] });
    }

    async create(user: any) {
        user = this.repository.create(user);
        return await this.repository.save(user);
    }

    async addRepresentationToUser(userId: number, representationId: number) {
        const representation = await this.repreRepository.findOne(representationId);
        console.log(representation);
        const user = await this.repository.findOne(userId, { relations: ['representations'] });

        if (user && representation) {
            user?.representations?.push(representation);
            await this.repository.save(user);
        }
        return user;
    }

}
