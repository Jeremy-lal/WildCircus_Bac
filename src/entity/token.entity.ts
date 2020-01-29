import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('token')
export class Token {

    @PrimaryGeneratedColumn({})
    id!: number;

    @Column({})
    value!: string;

    @OneToOne(type => User)
    @JoinColumn()
    user!: User;

}
