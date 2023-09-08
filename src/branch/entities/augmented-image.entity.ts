import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
/*import { Types, Schema as mongooseSchema } from 'mongoose';
import { Job } from 'src/job/entities/job.entity.js';
import { EOwnership } from 'src/enums/EOwnership.js';*/

@Schema({ timestamps: true })
@ObjectType()
export class AugmentedImage {
  @Prop({ required: true })
  @Field({
    description: 'URL location for the Model to be rendered for this Image',
  })
  modelURL: string;

  @Prop({ required: true })
  @Field({
    description:
      'URL location for the image that will be scanned by the device',
  })
  imageURL: string;

  @Field(() => Float, {
    description: 'Scale that the Augmented Image will have',
  })
  @Prop({ required: true })
  scale: number; //TODO: THINK ABOUT WHERE TO PLACE THESE VALUES BETTER

  @Field(() => Float, {
    description: 'Scale that the summary of the Augmented Image will have',
  })
  @Prop({ required: true })
  summaryScale: number;

  @Field(() => Float, {
    description:
      'Position in the X axis that the summary of the Augmented Image will have',
  })
  @Prop({ required: true })
  summaryX: number;

  @Field(() => Float, {
    description:
      'Position in the Z axis that the summary of the Augmented Image will have',
  })
  @Prop({ required: true })
  summaryZ: number;

  /*
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: Job.name, required: true })
  immediateAncestor = Job;

  @Prop({
    type: [{type: mongooseSchema.Types.ObjectId, refPath: ancestor, required: true}],
    required: true,
    validate: (array: Types.ObjectId[]) => array.length > 0, //TODO: verify this
  })
  ancestors: Types.ObjectId[]; //TODO: this as well

  ancestorModel: {
    type: String;
    required: true;
    enum: EOwnership;
  };*/
}

export const AugmentedImageSchema =
  SchemaFactory.createForClass(AugmentedImage);
