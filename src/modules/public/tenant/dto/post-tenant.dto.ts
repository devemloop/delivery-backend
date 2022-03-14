import { IsString, Length } from 'class-validator';

export class TenantDto {
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  @Length(2, 100)
  title: string;
}
