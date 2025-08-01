import { Injectable } from '@nestjs/common';
import { CreateBranchInput } from './dto/create-branch.input.js';
import { UpdateBranchInput } from './dto/update-branch.input.js';
import { InjectModel } from '@nestjs/mongoose';
import { Branch } from './entities/branch.entity.js';
import { Model, Types } from 'mongoose';
import { CompanyService } from '../company/company.service.js';
import { AugmentedImage } from './entities/augmented-image.entity.js';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name) private readonly branchModel: Model<Branch>,
    private readonly companyService: CompanyService,
  ) {}

  public async create(
    userId: Types.ObjectId,
    createBranchInput: CreateBranchInput,
  ): Promise<Branch> {
    const { companyId, address, augmentedImage, ...rest } = createBranchInput;

    const companyFound = await this.companyService.findOne(companyId);

    if (!companyFound) {
      throw new Error('CompanyId does not exist');
    }

    const { url, scale, summaryScale, summaryX, summaryZ } =
      companyFound.companySector.imageModel;

    const augmentedImagePayload: AugmentedImage = {
      ...augmentedImage,
      modelURL: url,
      scale,
      summaryScale,
      summaryX,
      summaryZ,
    };

    return (
      await this.branchModel.create({
        ...rest,
        augmentedImage: augmentedImagePayload,
        address: {
          coordinates: address,
        },
        ancestors: [userId, companyFound._id],
        immediateAncestor: companyFound._id,
      })
    ).toObject();
  }

  public async findByUserId(userId: Types.ObjectId): Promise<Branch[]> {
    return this.branchModel.find({ ancestors: userId }).lean().exec();
  }

  public async findByCompanyId(companyId: string): Promise<Branch[]> {
    return this.branchModel
      .find({ immediateAncestor: new Types.ObjectId(companyId) })
      .lean()
      .exec();
  }

  findAll() {
    return `This action returns all branch`;
  }

  findOne(branchId: string | Types.ObjectId): Promise<Branch | null> {
    return this.branchModel.findById(branchId).lean().exec();
  }

  public async update(
    id: string,
    updateBranchInput: Omit<UpdateBranchInput, 'id'>,
  ): Promise<Branch | null> {
    return this.branchModel
      .findByIdAndUpdate(id, updateBranchInput, { new: true })
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }

  async getBranchesWithOpenPositionsWithinRadiusOfCoordinates(
    coordinates: number[],
  ): Promise<Branch[]> {
    const [longitude, latitude] = coordinates;
    return this.branchModel
      .aggregate<Branch>([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            distanceField: 'dist.distanceField',
            maxDistance: 100,
            spherical: false,
          },
        },
        {
          $lookup: {
            from: 'jobs',
            localField: '_id',
            foreignField: 'immediateAncestor',
            pipeline: [
              {
                $match: {
                  isEnabled: true,
                },
              },
            ],
            as: 'jobs',
          },
        },
        {
          $project: {
            dist: 0,
          },
        },
        {
          $match: {
            $expr: {
              $ne: [
                0,
                {
                  $size: '$jobs',
                },
              ],
            },
          },
        },
      ])
      .limit(900)
      .exec();
  }
}
