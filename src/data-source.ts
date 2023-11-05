import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { dbUser, dbPassword, dbPort, database } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
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
