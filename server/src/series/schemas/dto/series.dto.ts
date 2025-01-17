import {
  IsObject,
  IsNotEmptyObject,
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { transformerStringArrayOrObject } from 'src/common/transformer';

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

export class CreateSeriesDto extends CreateSeriesFormDto {
  @Transform(transformerStringArrayOrObject)
  @IsObject()
  @IsNotEmptyObject()
  image: {
    tall: string;
    wide: string;
  };
}
