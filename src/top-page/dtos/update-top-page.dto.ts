import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page-model';

export class HhDataDto {
  @IsOptional()
  @IsNumber()
  count: number;

  @IsOptional()
  @IsNumber()
  juniorSalary: number;

  @IsOptional()
  @IsNumber()
  middleSalary: number;

  @IsOptional()
  @IsNumber()
  seniorSalary: number;
}

export class TopPageAdvantageDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateTopPageDto {
  @IsOptional()
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsOptional()
  @IsString()
  secondCategory: string;

  @IsOptional()
  @IsString()
  alias: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @Type(() => HhDataDto)
  hh?: HhDataDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];

  @IsOptional()
  @IsString()
  seoText: string;

  @IsOptional()
  @IsString()
  tagsTitle: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
