import { IsString } from 'class-validator';

export class DetailDTO {
    @IsString()
    id: string;
}
