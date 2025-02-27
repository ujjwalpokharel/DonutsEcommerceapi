import {
  Table,
  Column,
  AutoIncrement,
  ForeignKey,
  Model,
  DataType,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
@Table({ tableName: 'orderProducts' })
export class OrderProduct extends Model<OrderProduct> {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;
}
