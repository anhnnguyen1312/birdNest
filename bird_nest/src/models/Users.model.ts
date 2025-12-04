import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "Users",
  timestamps: true,
  freezeTableName: true,
})
export class Users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare password: string;
}
