import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "Orders",
  timestamps: true,
  freezeTableName: true,
})
export class Orders extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
  })
  declare totalPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare totalQuantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "pending",
  })
  declare status: string;
}
