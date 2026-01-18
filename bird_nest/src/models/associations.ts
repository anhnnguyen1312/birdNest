import { Cart } from "./Cart.model";
import { CartItems } from "./CartItems.model";
import { CheckoutItems } from "./CheckoutItems.model";
import { CheckoutSessions } from "./CheckoutSessions.model";
import { OAuthAccounts } from "./OAuthAccounts";
import { OrderItems } from "./OrderItems.model";
import { Orders } from "./Orders.model";
import { Products } from "./Products.model";
import { ProductVariant } from "./ProductVarient.model";
import { Users } from "./Users.model";

export function setupAssociations() {
  // Users relationships
  Users.hasMany(CheckoutSessions, { foreignKey: "userId" });
  Users.hasMany(Cart, { foreignKey: "userId" });
  Users.hasMany(Orders, { foreignKey: "userId" });
  Users.hasMany(OAuthAccounts, { foreignKey: "userId" });

  // CheckoutSessions relationships
  CheckoutSessions.belongsTo(Users, { foreignKey: "userId" });
  CheckoutSessions.hasMany(CheckoutItems, { foreignKey: "checkoutId" });

  // CheckoutItems relationships
  CheckoutItems.belongsTo(CheckoutSessions, { foreignKey: "checkoutId" });
  CheckoutItems.belongsTo(Products, { foreignKey: "productId", as: "Product" });
  CheckoutItems.belongsTo(ProductVariant, {
    foreignKey: "variantId",
    as: "ProductVariant",
  });

  // Products relationships
  Products.hasMany(CheckoutItems, { foreignKey: "productId" });
  Products.hasMany(CartItems, { foreignKey: "productId" });
  Products.hasMany(OrderItems, { foreignKey: "productId" });
  Products.hasMany(ProductVariant, { foreignKey: "productId" });

  // ProductVariant relationships
  ProductVariant.belongsTo(Products, { foreignKey: "productId" });
  ProductVariant.hasMany(CheckoutItems, { foreignKey: "variantId" });
  ProductVariant.hasMany(CartItems, { foreignKey: "varientId" });

  // Cart relationships
  Cart.belongsTo(Users, { foreignKey: "userId" });
  Cart.hasMany(CartItems, { foreignKey: "cartId" });

  // CartItems relationships
  CartItems.belongsTo(Cart, { foreignKey: "cartId" });
  CartItems.belongsTo(Products, { foreignKey: "productId", as: "Product" });
  CartItems.belongsTo(ProductVariant, {
    foreignKey: "varientId",
    as: "ProductVariant",
  });

  // Orders relationships
  Orders.belongsTo(Users, { foreignKey: "userId" });
  Orders.hasMany(OrderItems, { foreignKey: "orderId" });

  // OrderItems relationships
  OrderItems.belongsTo(Orders, { foreignKey: "orderId" });
  OrderItems.belongsTo(Products, { foreignKey: "productId", as: "product" });

  // OAuthAccounts relationships
  OAuthAccounts.belongsTo(Users, { foreignKey: "userId" });
}
