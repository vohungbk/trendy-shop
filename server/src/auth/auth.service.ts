import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      console.log('authenticated', authenticated);

      if (!authenticated) {
        throw new UnauthorizedException('Credential are not valid.!!');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Credential are not valid.');
    }
  }
}
