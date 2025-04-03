import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {

  @Prop({ type: mongoose.Schema.Types.ObjectId,auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null })
  category: Types.ObjectId | null;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment',default: [] }] })
  comments: Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rate',default: [] }] })
  rates: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
