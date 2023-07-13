import { Injectable } from '@nestjs/common';
import { AugmentedImage } from './models/augmented-image.model.js';

@Injectable()
export class AugmentedImageService {
  public async getAllImages(): Promise<AugmentedImage[]> {
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
}
