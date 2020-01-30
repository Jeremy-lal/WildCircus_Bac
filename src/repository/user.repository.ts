import { User } from './../entity/user.entity';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
