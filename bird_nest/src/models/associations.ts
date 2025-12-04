import { Products } from "./Products.model";
import { ProductVariant } from "./ProductVarient.model";

export function setupAssociations() {
  Products.hasMany(ProductVariant, { foreignKey: "productId" });
  ProductVariant.belongsTo(Products, { foreignKey: "productId" });
}
