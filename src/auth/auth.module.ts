import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy.js';
import { AuthResolver } from './auth.resolver.js';
import { jwtConstants } from './constants.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    AuthResolver,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard, //This is for enabling the auth guard to all the endpoints without needing to use UseGuard all the time https://docs.nestjs.com/recipes/passport#enable-authentication-globally
    },
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
})
export class AuthModule {}
