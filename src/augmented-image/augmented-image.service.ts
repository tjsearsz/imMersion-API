import { Injectable } from '@nestjs/common';
import { AugmentedImage2 } from './entities/augmented-image.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AugmentedImageService {
  constructor(
    @InjectModel(AugmentedImage2.name)
    private readonly augmentedImageModel: Model<AugmentedImage2>,
  ) {}

  public async getAllImages(): Promise<AugmentedImage2[]> {
    return [
      {
        //modelURL: 'https://cdn.filestackcontent.com/vZvdHVwZR2mCLKPXuBsW',
        modelURL: 'https://cdn.filestackcontent.com/ziq9D8gWRYiJkdGbzW9w',
        imageURL: 'https://cdn.filestackcontent.com/Vi3fEpCOQ3Gv3JkBZUxb',
      },
      {
        imageURL: 'https://cdn.filestackcontent.com/KNit0crBQSm9RrT2bvX9',
        //modelURL: 'https://cdn.filestackcontent.com/2mjkUNgSRmEHb2es8C2A',
        modelURL: 'https://cdn.filestackcontent.com/vZvdHVwZR2mCLKPXuBsW',
      },
    ];
  }

  public async findOne(imageId: Types.ObjectId): Promise<AugmentedImage2> {
    return this.augmentedImageModel.findById(imageId);
    /*return {
      imageURL: 'https://cdn.filestackcontent.com/KNit0crBQSm9RrT2bvX9',
      //modelURL: 'https://cdn.filestackcontent.com/2mjkUNgSRmEHb2es8C2A',
      modelURL: 'https://cdn.filestackcontent.com/vZvdHVwZR2mCLKPXuBsW',
    };*/
  }
}
