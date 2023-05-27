import { JwtAuthGuard } from './../users/guards/jwt.guard';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
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
  UseGuards,
} from '@nestjs/common';
import { FindProductDto } from './dtos/find-product.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get('/:id')
  async getOneProd(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return product;
  }

  @Delete('/:id')
  async deleteProd(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.deleteById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateById(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return updatedProduct;
  }

  @HttpCode(200)
  @Post('find')
  find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
