import {
  IsEmpty,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateProductSliderImageDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  product_id: number;

  @IsString()
  @IsNotEmpty()
  altText: string;
}
