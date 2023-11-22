import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

export interface EmployeeInterface {
  id?: number;
  name: string;
  age: number;
}

@Table({ timestamps: true, tableName: "employee_master" })
export default class Employee extends Model<EmployeeInterface> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING(256), allowNull: false, unique: false })
  name!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
  age!: number;
}
