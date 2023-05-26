import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

class ProductCharacteristicDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  value: string;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  @IsOptional()
  credit: number;

  @IsNumber()
  @IsOptional()
  calculatedRating: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  advantages: string;

  @IsString()
  @IsOptional()
  disAdvantages: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];
}
