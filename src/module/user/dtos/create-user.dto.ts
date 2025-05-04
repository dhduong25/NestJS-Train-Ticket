import { OmitType } from '@nestjs/mapped-types';
import { UserDTO } from './user.dto';

export class CreateUserDTO extends OmitType(UserDTO, [
    'createdDate',
    'updatedDate',
    'isDeleted',
    'isActive',
] as const) {}
