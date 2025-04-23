import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ update: false })
    createdDate: Date;

    @UpdateDateColumn({ update: false })
    updatedDate: Date;

    @Column({ type: 'bit', default: false })
    isDeleted: boolean;

    @Column({ type: 'bit', default: true })
    isActive: boolean;
}
