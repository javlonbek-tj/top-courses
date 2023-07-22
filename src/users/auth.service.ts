import { User } from './user.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { UsersService } from './users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  INVALID_PASSWORD_ERROR,
  USER_IN_USE_ERROR,
  USER_NOT_FOUND_ERROR,
} from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    // Check if user exists
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException(USER_IN_USE_ERROR);
    }
    // Generate salt and hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = await this.usersService.create(email, hashedPassword);

    return newUser;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(INVALID_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async signin(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
