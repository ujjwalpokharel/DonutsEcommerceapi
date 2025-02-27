import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';
export class CreatePaymentDto {
  @IsString()
  payment_method: string;

  @IsIn(['pending', 'cancelled', 'completed', 'shipped'])
  status: 'pending' | 'cancelled' | 'completed' | 'shipped';
  @IsNotEmpty()
  @IsNumber()
  order_id: number;
  @IsString()
  cardNumber: string;
  @IsString()
  card_name: string;
  @IsString()
  expiryDate: string;
  @Type(() => Number)
  @IsNumber()
  cvc: number;
}
