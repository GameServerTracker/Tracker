import { DataSource } from "typeorm";
import { ServerData } from "./ServerData";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "server",
    synchronize: true,
    logging: false,
    entities: [ServerData],
    migrations: [],
    subscribers: [],
})