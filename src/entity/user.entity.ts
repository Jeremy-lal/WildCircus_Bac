import { Representation } from './representation.entity';
import { Column, Entity, PrimaryGeneratedColumn, Index, ManyToMany, JoinTable } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    firstname!: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    lastname!: string;

    @Index({unique: true})
    @Column({type: 'varchar', length: 255, nullable: false})
    email!: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    password!: string;

    @Column({type: 'boolean', nullable: false, default: false})
    status!: boolean;

    @ManyToMany( type => Representation, representation => representation.users, {
        cascade: ['update'],
    })
    @JoinTable()
    representations!: Representation[];
}
