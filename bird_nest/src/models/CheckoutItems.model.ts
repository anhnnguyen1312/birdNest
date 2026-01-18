import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Products } from "./Products.model";
import { ProductVariant } from "./ProductVarient.model";

@Table({
  tableName: "CheckoutItems",
  timestamps: true,
  freezeTableName: true,
})
export class CheckoutItems extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare checkoutId: number;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productId: number;

  @ForeignKey(() => ProductVariant)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare variantId: number | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
  })
  declare priceSnapshot: number;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
  })
  declare totalprice: number;
}
