import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: "postgres",
  host: configService.getOrThrow<string>("DB_HOST"),
  port: configService.getOrThrow<number>("DB_PORT"),
  username: configService.getOrThrow<string>("DB_USER"),
  password: configService.getOrThrow<string>("DB_PASS"),
  database: configService.getOrThrow<string>("DB_NAME"),
  entities: ["src/**/*.entity.ts"],
  migrations: ["database/migrations/*.ts"],
  synchronize: false,
});

export default AppDataSource;
