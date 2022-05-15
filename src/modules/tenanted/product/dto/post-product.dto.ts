import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class PostProductDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  reference: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description: string;

  @IsNumber()
  price: number;
}
