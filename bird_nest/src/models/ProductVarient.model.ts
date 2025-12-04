import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
// import { Products } from "./Products.model";

@Table({
  tableName: "ProductVariants",
  timestamps: true,
  freezeTableName: true,
})
export class ProductVariant extends Model {
  // @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productId: number;

  // @BelongsTo(() => Products)
  // declare Products: Products;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare variantName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare discountPrice: number | null;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare stock: number;
}
