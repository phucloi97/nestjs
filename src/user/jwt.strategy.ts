import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'deptraivl',
    });
  }
  async validate(ctx: any): Promise<Payload> {
    console.log('[strategy active]');
    const { user_name } = ctx;
    const user = await this.userRepository.findOne({ user_name });
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: Payload = { user_name, role: user.role };
    return payload;
  }
}
