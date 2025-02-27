import { Type } from 'class-transformer';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';
@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_method: string;

  @Column({
    type: DataType.ENUM('pending', 'cancelled', 'completed', 'shipped'),
    allowNull: false,
  })
  status: 'pending' | 'cancelled' | 'completed' | 'shipped';
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount_paid: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  card_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  card_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  expiry_date: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cvc: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;
}
