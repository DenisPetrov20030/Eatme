import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./src/models/entity/UserEntity";
import { TokenEntity } from "./src/models/entity/TokenEntity";
import { ProductEntity } from "./src/models/entity/ProductEntity";
import { ProductImageEntity } from "./src/models/entity/ProductImageEntity";
import { CartEntity } from "./src/models/entity/CartEntity";
import { CartItemEntity } from "./src/models/entity/CartItemEntity";
import { CategoryEntity } from "./src/models/entity/CategoryEntity";
import { OrderEntity } from "./src/models/entity/OrderEntity";
import { OrderItemEntity } from "./src/models/entity/OrderItemEntity";
import { WishlistItemEntity } from "./src/models/entity/WishlistItemEntity";
import { OrderStatusEntity } from "./src/models/entity/OrderStatusEntity";
import { CommentEntity } from "./src/models/entity/CommentEntity";

import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "159.65.127.191",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.PG_USERNAME || "food_store_db",
  synchronize: true,
  logging: false,
  entities: [
    UserEntity,
    TokenEntity,
    ProductEntity,
    CommentEntity,
    ProductImageEntity,
    CartEntity,
    CartItemEntity,
    CategoryEntity,
    OrderEntity,
    OrderItemEntity,
    WishlistItemEntity,
    OrderStatusEntity,
  ],
  migrations: [],
  subscribers: [],
});
