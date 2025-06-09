import { IsEmail, IsOptional, MinLength, MinLength as MinLengthName } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLengthName(3, { message: 'fullName must be at least 3 characters' })
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;
}
