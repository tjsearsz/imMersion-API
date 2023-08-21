import { Model } from 'mongoose';

export interface IQuery<P, R, M> {
  execute(model: Model<M>, parameters: P): Promise<R>;
}
