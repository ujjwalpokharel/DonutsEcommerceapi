import { IsNotEmpty, IsString, IsNumber, IsArray, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  order_date: string;

  @IsIn(['pending', 'completed', 'cancelled', 'shipped'])
  @IsNotEmpty()
  status: 'pending' | 'completed' | 'cancelled' | 'shipped';

  @IsNumber({ maxDecimalPlaces: 3 })
  @IsNotEmpty()
  total_amount: number;

  @IsNumber()
  user_id: number;

  @IsArray()
  products: Array<{ product_id: number; quantity: number }>;
}
