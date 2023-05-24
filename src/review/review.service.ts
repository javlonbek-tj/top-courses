import { CreateReviewDto } from './dtos/create-review.dto';
import { Review, ReviewDocument } from './review-model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  delete(id: string): Promise<Review> | null {
    return this.reviewModel.findByIdAndDelete(id);
  }

  findByProdId(prodId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(prodId) });
  }

  async deleteByProdId(prodId: string) {
    const deletedResult = await this.reviewModel.deleteMany({
      prodId: new Types.ObjectId(prodId),
    });
    if (deletedResult.deletedCount === 0) {
      throw new NotFoundException('Review with the given productId not Found');
    }
    return deletedResult;
  }
}
