import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ADMIN_REPOSITORY, USER_REPOSITORY } from 'utils/constants';
import { Admin } from 'src/admins/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ADMIN_REPOSITORY) private readonly adminModel: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('ujjwal', email, password);
    const user = await this.adminModel.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Admin) {
    console.log("uesr",user);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
