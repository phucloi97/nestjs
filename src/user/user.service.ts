import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userLogin } from './dto/user-login.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(userDto: UserDto) {
    return this.userRepository.createUser(userDto);
  }
  async signIn(userLogin: userLogin): Promise<{ access_token: string }> {
    const { email, password } = userLogin;
    let user = await this.userRepository.findOne({ email });
    let match = await user.validatePassword(password);
    console.log(user);
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { user_name: user.user_name, id: user.id };
    const access_token = await this.jwtService.sign(payload);
    return { access_token };
  }
}
