import { IsOptional } from 'class-validator';
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
@Table({ tableName: 'Customer' })
export class Customer extends Model<Customer> {
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
  @IsOptional()
  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  company: string;
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
  @IsOptional()
  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  appartment: string;

  @HasMany(() => Order)
  order: Order[];
}
