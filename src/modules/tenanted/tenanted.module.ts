import { Module } from '@nestjs/common';

import { TenancyModule } from '../tenancy/tenancy.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TenancyModule, CustomerModule, ProductModule],
  controllers: [],
  providers: [],
})
export class TenantedModule {}
