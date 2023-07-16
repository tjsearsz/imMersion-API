import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input.js';
import { UpdateUserInput } from './dto/update-user.input.js';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity.js';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(createUserInput: CreateUserInput): Promise<User> {
    return (await this.userModel.create(createUserInput)).toObject();
  }

  findAll() {
    return `This action returns all user`;
  }

  /*findOne(id: number) {
    return `This action returns a #${id} user`;
  }*/

  public async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  public async update(
    userId: string,
    updateUserInput: Omit<UpdateUserInput, 'id'>,
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(userId, updateUserInput, { new: true })
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async AuthenticateUser(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }
}
