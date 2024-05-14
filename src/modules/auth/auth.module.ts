import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET } from '@/common/constants/aliyun';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '180d',
      },
    }),
  ],
  providers: [AuthResolver, AuthService, ConsoleLogger, JwtStrategy, UserService],
  exports: [],
})
export class AuthModule {}
