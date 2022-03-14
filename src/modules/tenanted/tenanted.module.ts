import { Module } from '@nestjs/common';

import { TenancyModule } from '../tenancy/tenancy.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [TenancyModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class TenantedModule {}
