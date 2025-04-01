import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ type: mongoose.Schema.Types.ObjectId,auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'normal'], default: 'normal' })
  userType: 'admin' | 'normal';

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post',default: null }] })
  posts: Types.ObjectId[] | null;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment',default: null }] })
  comments: Types.ObjectId[] | null;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating',default: null }] })
  ratings: Types.ObjectId[] | null;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});