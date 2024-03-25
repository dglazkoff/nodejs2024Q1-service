import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: 5432,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  migrations: ['./src/migrations/*.ts'],
  entities: ['./**/*.entity.ts'],
});
