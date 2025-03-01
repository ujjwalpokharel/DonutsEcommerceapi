import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  postal_code: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  appartment: string;
}
