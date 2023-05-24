import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export type ReviewDocument = HydratedDocument<TopPage>;

@Schema()
export class TopPage {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop({ required: true })
  secondCategory: string;

  @Prop({ required: true })
  alias: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({
    type: {
      count: Number,
      juniorSalary: Number,
      middleSalary: Number,
      seniorSalary: Number,
    },
  })
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };

  @Prop({ required: true, type: [{ title: String, description: String }] })
  advantages: {
    title: string;
    description: string;
  }[];

  @Prop({ required: true })
  seoText: string;

  @Prop({ required: true })
  tagsTitle: string;

  @Prop([String])
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
