import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: { email: string; password: string; fullName: string }): Promise<UserDocument> {

    const newUser = await this.usersService.create(registerDto);
    return newUser;
  }

  async validateUser(email: string, pass: string): Promise<UserDocument | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    if (!user._id) {
      throw new UnauthorizedException('User ID is missing');
    }
    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateEmailOrPassword(userId: string, updates: { email?: string, password?: string }) {
    return this.usersService.updateUserInfo(userId, updates);
  }
}
