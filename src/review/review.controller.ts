import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review-model';

@Controller('review')
export class ReviewController {
  @Post()
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Get('byProduct/:prodId')
  async getOneReview(@Param('prodId') prodId: string) {}

  @Delete('/:id')
  async deleteReview(@Param('id') id: string) {}
}
