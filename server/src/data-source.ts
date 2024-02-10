import "reflect-metadata"
import { DataSource } from "typeorm"
import {FileEntity} from "./entity/FileEntity";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [FileEntity],
    migrations: [],
    subscribers: [],
})

