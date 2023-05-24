import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindTopPageDto } from './dtos/find-top-page.dto';
import { TopPage } from './top-page-model';

@Controller('top-page')
export class TopPageController {
  @Post()
  async create(@Body() dto: Omit<TopPage, '_id'>) {}

  @Get('/:id')
  async get(@Param('id') id: string) {}

  @Delete('/:id')
  async delete(@Param('id') id: string) {}

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: TopPage) {}

  @HttpCode(200)
  @Post()
  async find(@Body() body: FindTopPageDto) {}
}
