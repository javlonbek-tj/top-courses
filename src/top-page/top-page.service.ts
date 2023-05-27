import { CreateTopPageDto } from './dtos/create-top-page.dto';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopPage, TopPageDocument, TopLevelCategory } from './top-page-model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name)
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  create(@Body() dto: CreateTopPageDto): Promise<TopPage> {
    return this.topPageModel.create(dto);
  }

  findById(id: string): Promise<TopPage | null> {
    return this.topPageModel.findById(id).exec();
  }

  findByIdAlias(alias: string): Promise<TopPage | null> {
    return this.topPageModel.findOne({ alias }).exec();
  }

  findByCategory(firstCategory: TopLevelCategory): Promise<TopPage[] | null> {
    return this.topPageModel
      .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
      .exec();
  }

  deleteById(id: string): Promise<TopPage | null> {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  updateById(id: string, dto: Partial<TopPage>): Promise<TopPage | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
