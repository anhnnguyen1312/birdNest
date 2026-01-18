import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "OrderItems",
  timestamps: true,
  freezeTableName: true,
})
export class OrderItems extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare variantId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
  })
  declare total: number; // quantity * price
}
