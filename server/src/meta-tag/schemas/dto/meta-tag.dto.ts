import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMetaTagDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class EditMetaTagDto {
  @IsString()
  @IsOptional()
  title?: string;
}
