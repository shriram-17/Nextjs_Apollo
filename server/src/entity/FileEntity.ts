import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    filename!: string;

    @Column()
    size!: number;

    @Column()
    type!: string;

    @Column({ type: 'bytea', nullable: true })
    content!: Buffer;
}
