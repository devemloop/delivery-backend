import { Connection } from 'typeorm';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { TenantModule } from '@modules/public/tenant/tenant.module';
import { UserModule } from '@modules/public/user/user.module';
import { AuthModule } from '@modules/public/auth/auth.module';

import { AuthGuard } from './guards/auth.guard';

import ormconfig from '../orm.config';
import { TenantedModule } from '@modules/tenanted/tenanted.module';
import { UserDataMiddleware } from './user-data.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    TenantModule,
    UserModule,
    AuthModule,
    TenantedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserDataMiddleware).forRoutes('*');
  }
}
