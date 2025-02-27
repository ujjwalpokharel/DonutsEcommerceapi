import {
  AutoIncrement,
  PrimaryKey,
  Column,
  Table,
  DataType,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';

@Table({
  tableName: 'categoriesProducts',
})
export class CategoriesProduct extends Model<CategoriesProduct> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;
}
