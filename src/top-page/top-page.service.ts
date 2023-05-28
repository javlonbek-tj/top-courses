import { CreateTopPageDto } from './dtos/create-top-page.dto';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopPage, TopLevelCategory, TopPageDocument } from './top-page-model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name)
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  create(@Body() dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  findByIdAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: {
          $push: {
            alias: '$alias',
            title: '$title',
            _id: '$_id',
            category: '$category',
          },
        },
      })
      .exec();
  }

  async findByText(text: string) {
    return this.topPageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  async findByPartial(text: string) {
    const regex = new RegExp(text, 'i');
    return this.topPageModel
      .find({ $or: [{ title: regex }, { category: regex }] })
      .exec();
  }

  deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  updateById(id: string, dto: Partial<CreateTopPageDto>) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
