import { JwtAuthGuard } from './../users/guards/jwt.guard';
import { UpdateTopPageDto } from './dtos/update-top-page.dto';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { IdValidationPipe } from './../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dtos/create-top-page.dto';
import { TopPageService } from './top-page.service';
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindTopPageDto } from './dtos/find-top-page.dto';

@Controller('top-page')
@UseGuards(JwtAuthGuard)
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}
  @Post()
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get('/:id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);
    if (!page) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
    return page;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias', IdValidationPipe) alias: string) {
    const page = await this.topPageService.findByIdAlias(alias);
    if (!page) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
    return page;
  }

  @Delete('/:id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id);
    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateTopPageDto,
  ) {
    const updatedTopPage = await this.topPageService.updateById(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
    return updatedTopPage;
  }

  @HttpCode(200)
  @Post('find') // It does not satisfy REST rules
  find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }

  @Get()
  async findByPartial(@Query('text') text: string) {
    return this.topPageService.findByPartial(text);
  }
}
