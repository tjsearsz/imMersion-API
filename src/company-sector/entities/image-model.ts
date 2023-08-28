import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Image3DModel {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  filename: string;
}

export const Image3DModelSchema = SchemaFactory.createForClass(Image3DModel);
