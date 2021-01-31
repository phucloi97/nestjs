import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'deptraivl',
    });
  }
  async validate(payload: any) {
    const { user_name } = payload;
    const user = await this.userRepository.findOne({ user_name });
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(user_name);
    return user_name;
  }
}
