import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsDate,
  IsObject,
  IsNotEmptyObject,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { transformerStringArrayOrObject } from 'src/common/transformer';

export class CreateEpisodeFormDto {
  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsOptional()
  @IsString()
  episode: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform(transformerStringArrayOrObject)
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  metaTags: string[];

  @Type(() => Date)
  @IsDate()
  releaseDate: Date;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(transformerStringArrayOrObject)
  @IsObject()
  @IsNotEmptyObject()
  details: Record<string, string>;
}

export class CreateEpisodeDto extends CreateEpisodeFormDto {
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  media: string;
}
