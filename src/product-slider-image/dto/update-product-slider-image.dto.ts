import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSliderImageDto } from './create-product-slider-image.dto';

export class UpdateProductSliderImageDto extends PartialType(CreateProductSliderImageDto) {}
