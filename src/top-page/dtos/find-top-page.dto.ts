import { Prop, Schema } from '@nestjs/mongoose';
import { TopLevelCategory } from '../top-page-model';

@Schema()
export class FindTopPageDto {
  @Prop({ required: true })
  firstCategory: TopLevelCategory;
}
