import { IsString } from 'class-validator';
import { BaseDTO } from 'utils/dtos';

export class UserDTO extends BaseDTO {
    @IsString()
    fullName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    address: string;

    @IsString()
    birthDay: Date;
}
