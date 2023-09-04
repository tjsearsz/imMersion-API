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

  @Prop({ required: true })
  scale: number; //TODO: THINK ABOUT WHERE TO PLACE THESE VALUES BETTER

  @Prop({ required: true })
  summaryScale: number;

  @Prop({ required: true })
  summaryX: number;

  @Prop({ required: true })
  summaryZ: number;
}

export const Image3DModelSchema = SchemaFactory.createForClass(Image3DModel);
