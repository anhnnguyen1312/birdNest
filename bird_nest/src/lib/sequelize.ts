import { Sequelize } from "sequelize-typescript";
import { Users } from "@/models/Users.model";
import { Products } from "@/models/Products.model";
import { FeaturedProducts } from "@/models/FeaturedProducts";
import { ProductVariant } from "@/models/ProductVarient.model";
import { setupAssociations } from "@/models/associations";

import "reflect-metadata";
import pg from "pg";
declare global {
  var _sequelize: Sequelize | undefined;
  var users: typeof Users | undefined;
}

const createSequelizeInstance = () => {
  const sequelize = new Sequelize({
    dialectModule: pg,
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false,
    models: [Users, Products, FeaturedProducts, ProductVariant],
  });

  setupAssociations();

  return sequelize;
};

// const sequelize = global._sequelize ?? createSequelizeInstance();
const sequelize = createSequelizeInstance();

// FIX cho Next.js dev mode (hot reload)
// if (process.env.NODE_ENV !== "production") {
//   global._sequelize = sequelize;
//   global.users = Users;
//   console.log("global dev: ", global._sequelize);
//   console.log("global Users: ", global.users);
// }

export default sequelize;
