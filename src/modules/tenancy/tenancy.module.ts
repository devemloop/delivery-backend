import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { Request } from 'express';
import { Connection } from 'typeorm';

import { TENANT_DATABASE_CONNECTION } from '@shared/constants';
import { getTenantConnection } from './tenancy.utils';

const connectionFactory: FactoryProvider<Promise<Connection>> = {
  provide: TENANT_DATABASE_CONNECTION,
  scope: Scope.REQUEST,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    const { authData } = request;

    if (authData && authData.tenantId) {
      return getTenantConnection(authData.tenantId);
    }

    return null;
  },
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [TENANT_DATABASE_CONNECTION],
})
export class TenancyModule {}
