import { CreateReviewDto } from './dtos/create-review.dto';
import { Review, ReviewDocument } from './review-model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { REVIEW_NOT_FOUND_ERROR } from './review.constants';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  delete(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  findByProdId(prodId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ productId: new Types.ObjectId(prodId) })
      .exec();
  }

  async deleteByProdId(prodId: string) {
    const deletedResult = await this.reviewModel.deleteMany({
      prodId: new Types.ObjectId(prodId),
    });
    if (deletedResult.deletedCount === 0) {
      throw new NotFoundException(REVIEW_NOT_FOUND_ERROR);
    }
    return deletedResult;
  }
}
