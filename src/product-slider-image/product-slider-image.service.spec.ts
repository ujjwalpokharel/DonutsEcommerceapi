import { Test, TestingModule } from '@nestjs/testing';
import { ProductSliderImageService } from './product-slider-image.service';

describe('ProductSliderImageService', () => {
  let service: ProductSliderImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSliderImageService],
    }).compile();

    service = module.get<ProductSliderImageService>(ProductSliderImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
