import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindProductDto } from './dtos/find-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get('/:id')
  async getOneProd(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not Found');
    }
    return product;
  }

  @Delete('/:id')
  async deleteProd(@Param('id') id: string) {
    const product = await this.productService.deleteById(id);
    if (!product) {
      throw new NotFoundException('Product not Found');
    }
    return product;
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const updatedProduct = await this.productService.updateById(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException('User Not Found');
    }
    return updatedProduct;
  }

  @HttpCode(200)
  @Post('find')
  find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
