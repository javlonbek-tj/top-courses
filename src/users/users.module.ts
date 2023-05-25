import { JwtStrategy } from './strategies/jwt-strategy';
import { getJwtConfig } from '../configs/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
})
export class UsersModule {}
