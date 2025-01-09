import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class EditGenreDto {
  @IsString()
  @IsOptional()
  title?: string;
}
