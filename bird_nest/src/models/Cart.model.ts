import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "Cart",
  timestamps: true,
  freezeTableName: true,
})
export class Cart extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number;

  // Field để lưu UUID cho guest cart (khi userId = null)
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  declare guestCartId: string | null;
}
