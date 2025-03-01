import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { userProvider } from 'src/users/user.provider';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from 'src/admins/admins.module';
import { adminProvider } from 'src/admins/admins.provider';

@Module({
  imports: [
    AdminsModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '100060s' },
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...adminProvider],
})
export class AuthModule {}
