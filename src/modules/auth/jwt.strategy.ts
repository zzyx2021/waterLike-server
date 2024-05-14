import { JWT_SECRET } from '@/common/constants/aliyun';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrkey: JWT_SECRET,
    });
  }
  async validate(user): Promise<any> {
    if (!user.id) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
