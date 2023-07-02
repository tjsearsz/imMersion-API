import { Injectable } from '@nestjs/common';
import { AugmentedImage } from './models/augmented-image.model.js';

@Injectable()
export class AugmentedImageService {
  public async getAllImages(): Promise<AugmentedImage> {
    return {
      modelURL: 'https://cdn.filestackcontent.com/vZvdHVwZR2mCLKPXuBsW',
      imageURL: 'https://cdn.filestackcontent.com/Vi3fEpCOQ3Gv3JkBZUxb',
    };
  }
}
