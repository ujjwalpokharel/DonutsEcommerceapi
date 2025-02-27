import {
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { CategoriesProduct } from 'src/categories-product/entities/categories-product.entity';
import { Product } from 'src/products/entities/product.entity';
@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(),
  })
  category_name: string;

  @BelongsToMany(() => Product, () => CategoriesProduct)
  product: Product[];
}
