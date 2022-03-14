import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  tenantId: string;

  @IsString()
  @Length(1, 130)
  name: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(130)
  email: string;

  @IsString()
  @Length(10, 30)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
