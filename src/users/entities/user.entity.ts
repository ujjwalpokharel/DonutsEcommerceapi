import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';
@Table({ tableName: 'users' })
export class User extends Model<User> {
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
  first_name: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING(),
  })
  username: string;

  @Column({
    type: DataType.STRING(),
  })
  password: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  postal_code: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })
  appartment: string;

  @HasMany(() => Order)
  order: Order[];
}
