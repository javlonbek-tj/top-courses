import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

class ProductCharacteristicDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

@Schema()
export class Product {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  oldPrice?: number;

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

  @Prop([String])
  tags: string[];

  @Prop({ required: true, type: [ProductCharacteristicDto] })
  characteristics: ProductCharacteristicDto[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
