import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import _ from 'lodash';
import { BaseEntity } from 'utils/entities';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @Column({ type: String, length: 200, nullable: false })
    email: string;

    @Column({ type: String, length: 200, select: false, nullable: false })
    @Exclude()
    password: string;

    @Column({ type: String, length: 200, nullable: false })
    fullName: string;

    @Column({ type: String, length: 200 })
    address: string;

    @Column({ type: 'date', nullable: true })
    birthDay: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async bcryptPassword() {
        const salt: string = await bcrypt.genSalt(10);

        if (!_.isEmpty(this.password)) {
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}
