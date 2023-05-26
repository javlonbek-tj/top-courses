import { IsString } from 'class-validator';

export class UserEmailDto {
  @IsString()
  email: string;
}
