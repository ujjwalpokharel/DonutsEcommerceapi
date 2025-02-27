import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { orderProductProvider } from './order-product.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProduct } from './entities/order-product.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderProduct])],
  controllers: [OrderProductController],
  providers: [OrderProductService, ...orderProductProvider],
})
export class OrderProductModule {}
