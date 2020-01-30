import { User } from './user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('representation')
export class Representation {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'timestamp', nullable: false})
    date!: Date;

    @Column({type: 'varchar', length: 50, nullable: false})
    hour!: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    adress!: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    city!: string;

    @Column({type: 'int', nullable: false})
    capacity!: number;

    @Column({type: 'int', nullable: false, default: 0})
    nbreserved!: number;

    @Column({type: 'varchar', length: 50, nullable: false })
    price!: string;

    @Column({type: 'boolean', nullable: false })
    forMember!: boolean;

    @ManyToMany( type => User, user => user.representations)
    @JoinTable()
    users!: User[];
}
