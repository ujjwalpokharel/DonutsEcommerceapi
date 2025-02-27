import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
export class CreateCategoriesProductDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
