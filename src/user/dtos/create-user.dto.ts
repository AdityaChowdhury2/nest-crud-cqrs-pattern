import { IsEmail, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Min(18)
  @Max(100)
  @IsNumber()
  age: number;
}
