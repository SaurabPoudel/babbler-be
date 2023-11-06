import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { database, dbPassword, dbPort, dbUser } from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: database,
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [],
  subscribers: [],
});
