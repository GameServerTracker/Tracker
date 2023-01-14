import { DataSource } from "typeorm";
import { ServerData } from "./ServerData";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER || "root",
    password: process.env.POSTGRES_PASSWORD || "root",
    database: process.env.POSTGRES_DB || "server",
    synchronize: true,
    logging: false,
    entities: [ServerData],
    migrations: [],
    subscribers: [],
})