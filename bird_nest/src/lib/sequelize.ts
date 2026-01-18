import { Sequelize } from "sequelize-typescript";
import { Users } from "@/models/Users.model";
import { Products } from "@/models/Products.model";
import { FeaturedProducts } from "@/models/FeaturedProducts";
import { ProductVariant } from "@/models/ProductVarient.model";
import { setupAssociations } from "@/models/associations";
import { Cart } from "@/models/Cart.model";
import { CartItems } from "@/models/CartItems.model";
import { OAuthAccounts } from "@/models/OAuthAccounts";

import "reflect-metadata";
import pg from "pg";
import { Orders } from "@/models/Orders.model";
import { OrderItems } from "@/models/OrderItems.model";
import { Blogs } from "@/models/Blogs.model";
import { Comments } from "@/models/Comments.model";
import { CheckoutSessions } from "@/models/CheckoutSessions.model";
import { CheckoutItems } from "@/models/CheckoutItems.model";
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
    models: [
      Users,
      Cart,
      CartItems,
      Products,
      FeaturedProducts,
      ProductVariant,
      Orders,
      OrderItems,
      Blogs,
      Comments,
      CheckoutSessions,
      CheckoutItems,
      OAuthAccounts,
    ],
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
