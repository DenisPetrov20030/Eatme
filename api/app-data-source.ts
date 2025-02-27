import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./src/models/entity/UserEntity"
import { TokenEntity } from "./src/models/entity/TokenEntity"
import { ProductEntity } from "./src/models/entity/ProductEntity"
import { ProductImageEntity } from "./src/models/entity/ProductImageEntity"
import { CategoryEntity } from "./src/models/entity/CategoryEntity"
import { CommentEntity } from "./src/models/entity/CommentEntity"

import { config } from "dotenv"

config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.PG_USERNAME || 'food_store_db',
    synchronize: true,
    logging: false,
    entities: [UserEntity, TokenEntity, ProductEntity, CommentEntity, ProductImageEntity, CategoryEntity],
    migrations: [],
    subscribers: [],
})
