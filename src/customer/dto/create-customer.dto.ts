import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class OrderDetails {
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
}
class CreatePaymentDetails {
  @IsString()
  card_number: string;
  @IsString()
  card_name: string;
  @IsString()
  expiry_date: string;
  @Type(() => Number)
  @IsNumber()
  cvc: number;
  @Type(() => Number)
  @IsNumber()
  amount_paid: number;
}
export class CreateCustomerDto {
  @IsString()
  order_date: string;
  @IsString()
  deliveyOption: string;
  @IsString()
  first_name: string;
  @IsString()
  email: string;
  @IsString()
  last_name: string;
  @IsOptional()
  @IsString()
  company?: string;
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  appartment?: string;
  @IsString()
  city: string;
  @IsString()
  postalcode: string;
  @ValidateNested()
  @Type(() => CreatePaymentDetails)
  paymentDetails: CreatePaymentDetails;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetails)
  orderDetails: OrderDetails[];
}
