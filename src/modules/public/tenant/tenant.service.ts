import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantDto } from './dto/post-tenant.dto';
import { getTenantConnection } from '@modules/tenancy/tenancy.utils';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantReposity: Repository<Tenant>,
  ) {}

  async getTenantById(id: string) {
    return this.tenantReposity.findOne(id);
  }

  async postTenant(body: TenantDto) {
    const tenant = await this.tenantReposity.save(body);

    const schemaName = `tenant_${tenant.id}`;
    getManager().query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    const connection = await getTenantConnection(tenant.id);
    await connection.runMigrations();
    await connection.close();

    return tenant;
  }
}
