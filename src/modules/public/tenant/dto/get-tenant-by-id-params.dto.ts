import { IsUUID } from 'class-validator';

export class GetTenantByIdParams {
  @IsUUID()
  id: string;
}
