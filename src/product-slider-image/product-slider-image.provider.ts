import { PRODUCT_IMAGE_SLIDER } from '../../utils/constants';
import { ProductSliderImage } from './entities/product-slider-image.entity';
export const productSliderImageProvider = [
  {
    provide: PRODUCT_IMAGE_SLIDER,
    useValue: ProductSliderImage,
  },
];
