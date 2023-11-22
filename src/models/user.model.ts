import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  username?: string;
  password: string;
}

@Table({ timestamps: true, tableName: "user_master" })
export default class User extends Model<UserInterface> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING(256), allowNull: false, unique: false })
  name!: string;

  @Column({ type: DataType.STRING(256), allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING(256), allowNull: true, unique: false })
  username!: string;

  @Column({ type: DataType.STRING(256), allowNull: false, unique: false })
  password!: string;
}
