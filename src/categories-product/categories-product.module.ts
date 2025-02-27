import { Module } from '@nestjs/common';
import { CategoriesProductService } from './categories-product.service';
import { CategoriesProductController } from './categories-product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesProduct } from './entities/categories-product.entity';

@Module({
  imports: [SequelizeModule.forFeature([CategoriesProduct])],
  controllers: [CategoriesProductController],
  providers: [CategoriesProductService],
})
export class CategoriesProductModule {}
