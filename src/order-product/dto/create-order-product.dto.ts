import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsNumber()
  order_id: Number;

  @IsNotEmpty()
  @IsNumber()
  product_id: Number;

  @IsNotEmpty()
  @IsNumber()
  quantity: Number;
}
