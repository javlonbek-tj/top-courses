import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review-model';
import { ReviewController } from './review.controller';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
})
export class ReviewModule {}
