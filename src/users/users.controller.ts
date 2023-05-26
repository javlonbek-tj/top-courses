import { CurrentUserEmail } from './decorators/current-user_email.decorator';
import { JwtAuthGuard } from '../users/guards/jwt.guard';
import { UserEmailDto } from './dtos/user-email.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  createUser(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto.email, dto.password);
  }

  @Post('/signin')
  @HttpCode(200)
  async loginUser(@Body() dto: CreateUserDto) {
    const { email } = await this.authService.validateUser(
      dto.email,
      dto.password,
    );
    return this.authService.signin(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  getAllUsers(
    @Query() { email }: UserEmailDto,
    @CurrentUserEmail() currentUserEmail: string,
  ) {
    return this.usersService.find(email);
  }
}
