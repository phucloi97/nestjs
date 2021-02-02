import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'company',
  username: 'loye',
  password: '1011',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true, // dong bo table moi khi khoi dong
};
