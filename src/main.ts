import { getTenantConnection } from '@modules/tenancy/tenancy.utils';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnection, getManager } from 'typeorm';
import { AppModule } from './app.module';

async function runMigrations() {
  await getConnection().runMigrations();

  const schemas = await getManager().query(
    'select schema_name as name from information_schema.schemata;',
  );

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith('tenant_')) {
      const tenantId = schema.replace('tenant_', '');
      const connection = await getTenantConnection(tenantId);
      await connection.runMigrations();
      await connection.close();
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await runMigrations();

  await app.listen(3000);
}
bootstrap();
