import {
  IsObject,
  IsNotEmptyObject,
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

function transformerStringArrayOrObject({ value }) {
  if (Array.isArray(value) || typeof value === 'object') return value;
  if (typeof value === 'string' && value.trim() !== '')
    return JSON.parse(value);
  return value;
}

export class CreateSeriesFormDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform(transformerStringArrayOrObject)
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  metaTags: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(transformerStringArrayOrObject)
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  genres: string[];

  @Transform(transformerStringArrayOrObject)
  @IsObject()
  @IsNotEmptyObject()
  details: Record<string, string>;
}

class ImageDto {
  @IsString()
  @IsNotEmpty()
  tall: string;

  @IsString()
  @IsNotEmpty()
  wide: string;
}

export class CreateSeriesDto {
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => ImageDto)
  image: ImageDto;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  metaTags: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  genres: string[];

  @IsString()
  @IsNotEmptyObject()
  details: Record<string, string>;
}
