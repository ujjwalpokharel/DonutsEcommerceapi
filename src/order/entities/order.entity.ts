import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'orders',
})
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.ENUM('pending', 'completed', 'cancelled', 'shipped'),
    allowNull: false,
  })
  status: 'pending' | 'completed' | 'cancelled' | 'shipped';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_date: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total_amount: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsToMany(() => Product, () => OrderProduct)
  product: Product[];

  @HasMany(() => Payment)
  payment: Payment;
}
