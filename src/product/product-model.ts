import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  oldPrice: number;

  @Prop({ required: true })
  credit: number;

  @Prop({ required: true })
  calculatedRating: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  advantages: string;

  @Prop({ required: true })
  disAdvantages: string;

  @Prop([String])
  categories: string[];

  @Prop({ required: true })
  tags: string;

  @Prop({ required: true, type: [{ name: String, value: String }] })
  characteristics: {
    name: string;
    value: string;
  }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
