import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "Blogs",
  timestamps: true,
  freezeTableName: true,
})
export class Blogs extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare slug: string;

  // Content HTML (render từ markdown)
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare content: string | null;

  // Markdown gốc
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare markdown: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare excerpt: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare category: string;

  // PostgreSQL
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  declare tags: string[] | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare imageUrl: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare author: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare publishedAt: Date | null;
}
