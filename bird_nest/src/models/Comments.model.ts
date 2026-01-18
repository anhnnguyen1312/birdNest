import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Blogs } from "./Blogs.model";
import { Products } from "./Products.model";
import { Users } from "./Users.model";

@Table({
  tableName: "Comments",
  timestamps: true,
  freezeTableName: true,
})
export class Comments extends Model {
  /* ========== BLOG COMMENT ========== */
  @ForeignKey(() => Blogs)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // null nếu là product comment
  })
  declare blogId: number | null;

  @BelongsTo(() => Blogs)
  declare blog: Blogs;

  /* ========== PRODUCT COMMENT ========== */
  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // null nếu là blog comment
  })
  declare productId: number | null;

  @BelongsTo(() => Products)
  declare product: Products;

  /* ========== USER / GUEST ========== */
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => Users)
  declare user: Users;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare guestName: string | null;

  /* ========== CONTENT ========== */
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;
}
