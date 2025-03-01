import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table({ tableName: 'admins' })
export class Admin extends Model<Admin> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  password: string;
}
