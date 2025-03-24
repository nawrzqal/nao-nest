import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Ninja extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, enum: ['stars', 'nunchucks'] })
    weapon: string;

}

export const NinjaSchema = SchemaFactory.createForClass(Ninja);
