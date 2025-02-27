import { Module } from '@nestjs/common';
import { ProductSliderImageService } from './product-slider-image.service';
import { ProductSliderImageController } from './product-slider-image.controller';
import { productSliderImageProvider } from './product-slider-image.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductSliderImage } from './entities/product-slider-image.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductSliderImage])],
  controllers: [ProductSliderImageController],
  providers: [ProductSliderImageService, ...productSliderImageProvider],
})
export class ProductSliderImageModule {}
