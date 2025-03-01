import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesProductModule } from './categories-product/categories-product.module';
import { CategoryModule } from './category/category.module';
import { OrderProductModule } from './order-product/order-product.module';
import { OrderModule } from './order/order.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductSliderImageModule } from './product-slider-image/product-slider-image.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CustomerModule } from './customer/customer.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'ever_donuts',
      autoLoadModels: true,
    }),
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),

    ProductsModule,
    CategoryModule,
    UsersModule,
    OrderModule,
    CategoriesProductModule,
    ProductSliderImageModule,
    OrderProductModule,
    PaymentsModule,
    AuthModule,
    CustomerModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
