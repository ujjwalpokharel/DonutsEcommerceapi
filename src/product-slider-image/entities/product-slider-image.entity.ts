import {
  ForeignKey,
  PrimaryKey,
  Column,
  Table,
  Model,
  AutoIncrement,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';
@Table({ tableName: 'productSliderImages' })
export class ProductSliderImage extends Model<ProductSliderImage> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;
  @Column({
    type: DataType.STRING,
  })
  image: string;
  @Column({
    type: DataType.STRING,
  })
  altText: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;
}
