import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ update: false })
    createdDate: Date;

    @UpdateDateColumn({ update: false })
    updatedDate: Date;

    @DeleteDateColumn({ update: false })
    deletedDate: Date;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
}
