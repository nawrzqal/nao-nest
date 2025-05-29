import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Type } from '@nestjs/common';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  creator: {
    _id: Types.ObjectId;
    username: string;
    imageUrl: string;
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;

  /*
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  parentComment?: Types.ObjectId | Comment;
  */

  @Prop({ default: false })
  isEdited: boolean;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);