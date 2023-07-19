import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { User } from 'src/user/entities/user.entity.js';
import { CreateUserInput } from 'src/user/dto/create-user.input.js';
import * as bcrypt from 'bcrypt';
import { LoginPayload } from './dto/login-payload.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async AuthenticateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.AuthenticateUser(email);

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || '',
    );

    if (user && isPasswordValid) {
      const { password, ...userData } = user;
      return userData;
    }

    return null;
  }

  public async login(user: User): Promise<LoginPayload> {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user };
  }

  public async signIn({
    password: plainPassword,
    ...createUserPayload
  }: CreateUserInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return this.userService.create({
      ...createUserPayload,
      password: hashedPassword,
    });
  }
}
