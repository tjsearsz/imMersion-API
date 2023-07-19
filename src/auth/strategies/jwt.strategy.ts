import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constants.js';
import { IUserSummary } from '../interfaces/IUserSummary.js';
import { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // https://docs.nestjs.com/recipes/passport#implementing-passport-jwt We could use this place to enrich the user
  public async validate(payload: any): Promise<IUserSummary> {
    //payload -> decoded JWT
    return { userId: new Types.ObjectId(payload.sub), email: payload.email };
  }
}
