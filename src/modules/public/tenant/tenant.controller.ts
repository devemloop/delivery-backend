import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTenantByIdParams } from './dto/get-tenant-by-id-params.dto';
import { TenantDto } from './dto/post-tenant.dto';
import { TenantService } from './tenant.service';

@ApiTags('Tenant')
@ApiBearerAuth()
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
