import { IsOptional, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsOptional()
  @IsNumber()
  season: number;

  @IsNotEmpty()
  @IsString()
  title: string;
}
