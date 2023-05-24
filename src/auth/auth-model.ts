import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
