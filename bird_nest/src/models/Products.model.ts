import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "Products",
  timestamps: true,
  freezeTableName: true,
})
export class Products extends Model {
  // @HasMany(() => ProductVariant)
  // declare variants: ProductVariant[];
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "Uncategorized",
  })
  declare category: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare price: number;
  @Column({
    type: DataType.STRING,
  })
  declare gift: string;
  @Column({
    type: DataType.INTEGER,
  })
  declare discountPrice: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare stock: number;

  @Column({
    type: DataType.STRING,
  })
  declare imageUrlThumb: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  declare imageUrlArr: string[];
}
