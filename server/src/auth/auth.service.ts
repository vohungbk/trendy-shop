import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { Response } from 'express';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('Credential are not valid.!!');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Credential are not valid.');
    }
  }

  async login(user: User, res: Response) {
    try {
      const expires = new Date();
      expires.setMilliseconds(
        expires.getMilliseconds() +
          ms(this.configService.getOrThrow<string>('JWT_EXPIRATION')),
      );
      const tokenPayload: TokenPayload = {
        tokenId: user.id,
      };
      const token = this.jwtService.sign(tokenPayload);

      res.cookie('Authentication', token, {
        secure: true,
        httpOnly: true,
        expires,
      });

      return { tokenPayload };
    } catch (error) {
      console.log(error);
    }
  }
}
