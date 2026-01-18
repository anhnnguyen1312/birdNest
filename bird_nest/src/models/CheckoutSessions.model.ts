import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum CheckoutSource {
  CART = "cart",
  BUY_NOW = "buy_now",
}

export enum CheckoutStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  COMPLETED = "completed",
}

@Table({
  tableName: "CheckoutSessions",
  timestamps: true,
  freezeTableName: true,
})
export class CheckoutSessions extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @Column({
    type: DataType.ENUM(...Object.values(CheckoutSource)),
    allowNull: false,
  })
  declare source: CheckoutSource;

  @Column({
    type: DataType.ENUM(...Object.values(CheckoutStatus)),
    allowNull: false,
    defaultValue: CheckoutStatus.ACTIVE,
  })
  declare status: CheckoutStatus;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
  })
  declare subtotal: number;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
    defaultValue: 0,
  })
  declare shippingFee: number;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
    defaultValue: 0,
  })
  declare discount: number;

  @Column({
    type: DataType.DECIMAL(15, 0),
    allowNull: false,
  })
  declare totalPrice: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare expiresAt: Date;
}
