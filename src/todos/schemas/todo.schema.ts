import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })  
export class Todo {
  @Prop({ required: true, minlength: 3, maxlength: 100, unique: true })
  title: string;

  @Prop({ required: true, minlength: 10 })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  assignedTo: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  completedBy: Types.ObjectId | null;

  @Prop({ default: false })
  isCompleted: boolean;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
