import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  age: number;
}

// Create the UserSchema using SchemaFactory
export const UserSchema = SchemaFactory.createForClass(User);
