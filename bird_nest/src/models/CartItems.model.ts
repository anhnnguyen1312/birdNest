import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Products } from "./Products.model";
import { ProductVariant } from "./ProductVarient.model";

@Table({
  tableName: "CartItems",
  timestamps: true, // migration có createdAt + updatedAt
  freezeTableName: true,
})
export class CartItems extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare cartId: number;

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
  declare varientId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;
}
