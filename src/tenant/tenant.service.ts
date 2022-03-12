import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantDto } from './dto/post-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantReposity: Repository<Tenant>,
  ) {}

  async getTenantById(id: string) {
    return this.tenantReposity.findOne(id);
  }

  async postTenant(body: TenantDto) {
    return this.tenantReposity.save(body);
  }
}
