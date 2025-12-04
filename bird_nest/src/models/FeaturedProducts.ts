import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Products } from "./Products.model";

export type FeaturedType = "TOP" | "HOT" | "NEW";

@Table({
  tableName: "FeaturedProducts",
  timestamps: true, // migration có createdAt + updatedAt
  freezeTableName: true,
})
export class FeaturedProducts extends Model {
  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productId: number;

  @BelongsTo(() => Products)
  declare products: Products;

  @Column({
    type: DataType.ENUM("TOP", "HOT", "NEW"),
    defaultValue: "HOT",
    allowNull: false,
  })
  declare type: FeaturedType;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare endDate: Date;
}
