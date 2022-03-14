import { Inject, Injectable } from '@nestjs/common';
import { TENANT_DATABASE_CONNECTION } from '@shared/constants';
import { Connection } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(TENANT_DATABASE_CONNECTION)
    private readonly databaseConnection: Connection,
  ) {}

  async postCustomer() {
    console.log(this.databaseConnection);
  }
}
