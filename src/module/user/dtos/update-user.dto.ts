import { OmitType } from '@nestjs/mapped-types';
import { UserDTO } from './user.dto';

export class UpdateUserDTO extends OmitType(UserDTO, []) {}
