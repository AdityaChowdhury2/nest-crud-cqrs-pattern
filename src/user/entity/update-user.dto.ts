import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsInt()
  @Min(18)
  @Max(100)
  @IsOptional()
  readonly age?: number;
}
