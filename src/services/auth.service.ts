
import { UserService } from './user.service';
import { Token } from './../entity/token.entity';
import { TokenService } from './token.service';
import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';

export class AuthService {

    private repository: UserRepository;
    private userService: UserService;
    private tokenService: TokenService;

    constructor() {
        this.repository = getCustomRepository(UserRepository);
        this.tokenService = new TokenService();
        this.userService = new UserService();
    }

    private async getUserByEmail(email: string) {
        if (await this.repository.findOne({ where: { email }, select: ['email', 'password'] })) {
            return true;
        }
    }

    async signUp(user: User) {
        if (await this.getUserByEmail(user.email)) {
            throw new Error('ALREADY_EXIST');
        }
        user.password = await hash(user.password);

        const tokenString = randomBytes(12).toString('hex');

        user = this.repository.create(user);
        user = await this.repository.save(user);

        const token = new Token();
        token.user = user;
        token.value = tokenString;
        this.tokenService.create(token);
        return true;

    }

    async signIn(email: string, password: string) {
        const labelError = new Error('Invalide crendentials');
        const users = await this.repository.find({ where: { email }, relations: ['representations'] });
        const user = users[0];

        if (!user) {
            throw labelError;
        }
        const isValid = await verify(user.password, password);
        if (!isValid) {
            throw labelError;
        }

        const secret = process.env.WILD_JWT_SECRET;
        if (!secret) {
            throw new Error('Pas de secret SETUP');
        }
        delete user.password;
        const token = sign({ id: user.id, email: user.email }, secret);
        return { token, user };
    }

}
