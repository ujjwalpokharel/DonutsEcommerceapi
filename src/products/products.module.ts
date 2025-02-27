import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { categoryProvider } from 'src/category/category.provider';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { productProvider } from './products.provider';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ...productProvider, ...categoryProvider],
})
export class ProductsModule {}
