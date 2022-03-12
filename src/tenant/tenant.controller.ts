import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetTenantByIdParams } from './dto/get-tenant-by-id-params.dto';
import { TenantDto } from './dto/post-tenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get(':id')
  async getTenantById(@Param() params: GetTenantByIdParams) {
    return await this.tenantService.getTenantById(params.id);
  }

  @Post()
  async postTenant(@Body() body: TenantDto) {
    return await this.tenantService.postTenant(body);
  }
}
