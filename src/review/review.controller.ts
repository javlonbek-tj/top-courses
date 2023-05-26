import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../users/guards/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('/:prodId')
  getByProdId(@Param('prodId') prodId: string) {
    return this.reviewService.findByProdId(prodId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteReview(@Param('id') id: string) {
    const review = await this.reviewService.delete(id);
    if (!review) {
      throw new NotFoundException('Review with the given productId not Found');
    }
    return review;
  }

  @Delete('/:prodId')
  deleteByProdId(@Param('prodId') prodId: string) {
    return this.reviewService.deleteByProdId(prodId);
  }
}
