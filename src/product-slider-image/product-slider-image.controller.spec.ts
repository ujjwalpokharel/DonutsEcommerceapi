import { Test, TestingModule } from '@nestjs/testing';
import { ProductSliderImageController } from './product-slider-image.controller';
import { ProductSliderImageService } from './product-slider-image.service';

describe('ProductSliderImageController', () => {
  let controller: ProductSliderImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSliderImageController],
      providers: [ProductSliderImageService],
    }).compile();

    controller = module.get<ProductSliderImageController>(ProductSliderImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
