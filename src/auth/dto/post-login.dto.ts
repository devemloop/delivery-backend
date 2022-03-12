import { IsString } from 'class-validator';

export class PostLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
