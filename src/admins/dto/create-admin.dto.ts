import {
    IsEmail,
    IsNotEmpty,
    IsString
} from 'class-validator';
export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
