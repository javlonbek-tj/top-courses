import { Review } from './../review/review-model';
import { FindProductDto } from './dtos/find-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product, ProductDocument } from './product-model';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productModel.create(dto);
  }

  findById(id: string): Promise<Product | null> {
    if (!id) {
      return null;
    }
    return this.productModel.findById(id).exec();
  }

  deleteById(id: string): Promise<Product | null> {
    if (!id) {
      return null;
    }
    return this.productModel.findByIdAndDelete(id).exec();
  }

  updateById(id: string, dto: Partial<Product>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
            reviews: {
              $function: {
                body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								return reviews;
							}`,
                args: ['$reviews'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec();
  }
}
