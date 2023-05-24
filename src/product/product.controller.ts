import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindProductDto } from './dtos/find-product.dto';
import { Product } from './product-model';

@Controller('product')
export class ProductController {
  @Post()
  async create(@Body() dto: Omit<Product, '_id'>) {}

  @Get('/:id')
  async getOneProd(@Param('id') id: string) {}

  @Delete('/:id')
  async deleteProd(@Param('id') id: string) {}

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: Product) {}

  @HttpCode(200)
  @Post()
  async find(@Body() body: FindProductDto) {}
}
