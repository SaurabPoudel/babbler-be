import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
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
  entities: [User],
  migrations: [],
  subscribers: [],
});
