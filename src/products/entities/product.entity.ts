import {
  AutoIncrement,
  PrimaryKey,
  Column,
  Table,
  DataType,
  Model,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { CategoriesProduct } from 'src/categories-product/entities/categories-product.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Order } from 'src/order/entities/order.entity';
import { ProductSliderImage } from 'src/product-slider-image/entities/product-slider-image.entity';
@Table({
  tableName: 'products',
})
export class Product extends Model<Product> {
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
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  rating: number;

  @BelongsToMany(() => Category, () => CategoriesProduct)
  categories: Category[];

  @HasMany(() => ProductSliderImage)
  sliderImage: ProductSliderImage[];

  @BelongsToMany(() => Order, () => OrderProduct)
  order: Order[];
}
