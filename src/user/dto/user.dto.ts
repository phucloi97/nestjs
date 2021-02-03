import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  user_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 16,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
