import { CreateUserDto } from './/dtos/create.user.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto.email, dto.password);
  }

  @Post('/signin')
  async loginUser(@Body() dto: CreateUserDto) {
    const { email } = await this.authService.validateUser(
      dto.email,
      dto.password,
    );
    return this.authService.signin(email);
  }
}
