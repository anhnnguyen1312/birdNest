import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Users } from "./Users.model";

export enum OAuthProvider {
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

@Table({
  tableName: "OAuthAccounts",
  timestamps: true,
  freezeTableName: true,
})
export class OAuthAccounts extends Model {
  @Column({
    type: DataType.ENUM(...Object.values(OAuthProvider)),
    allowNull: false,
  })
  declare provider: OAuthProvider;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare providerId: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => Users)
  declare user: Users;
}
