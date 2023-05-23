import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  @Post()
  async register(@Body() body: AuthDto) {}

  @HttpCode(200)
  @Post()
  async login(@Body() body: AuthDto) {}
}
