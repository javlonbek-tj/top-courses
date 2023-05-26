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
import { REVIEW_NOT_FOUND_ERROR } from './review.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('/:prodId')
  getByProdId(@Param('prodId', IdValidationPipe) prodId: string) {
    return this.reviewService.findByProdId(prodId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteReview(@Param('id', IdValidationPipe) id: string) {
    const review = await this.reviewService.delete(id);
    if (!review) {
      throw new NotFoundException(REVIEW_NOT_FOUND_ERROR);
    }
    return review;
  }

  @Delete('/:prodId')
  deleteByProdId(@Param('prodId', IdValidationPipe) prodId: string) {
    return this.reviewService.deleteByProdId(prodId);
  }
}
