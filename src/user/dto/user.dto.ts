import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(4)
  user_name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
