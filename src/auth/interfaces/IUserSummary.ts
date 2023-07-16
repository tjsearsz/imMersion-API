import { Types } from 'mongoose';

export interface IUserSummary {
  email: string;
  userId: Types.ObjectId;
}
