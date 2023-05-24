import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Review } from './review-model';

@Controller('review')
export class ReviewController {
  @Post()
  async create(@Body() dto: Omit<Review, '_id'>) {}

  @Get('byProduct/:prodId')
  async getOneReview(@Param('prodId') prodId: string) {}

  @Delete('/:id')
  async deleteReview(@Param('id') id: string) {}
}
