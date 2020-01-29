import { createConnection } from 'typeorm';
import { User } from '../entity/user.entity';

export default async () => {

await createConnection({
    type: 'mysql',
    host: 'localhost',
    username: process.env.user_mysql,
    password: process.env.pwd_mysql,
    database: 'checkpoint4',
    entities: [
        User,
    ],
    synchronize: true,
});
};
