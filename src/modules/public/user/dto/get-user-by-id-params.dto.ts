import { IsUUID } from 'class-validator';

export class GetUserByIdParams {
  @IsUUID()
  id: string;
}
