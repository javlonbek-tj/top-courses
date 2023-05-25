import { User } from './user.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { UsersService } from './users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
      throw new BadRequestException('User in use');
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
      throw new UnauthorizedException('User not Found');
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return { email: user.email };
  }

  signin(email: string) {
    const payload = { email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
