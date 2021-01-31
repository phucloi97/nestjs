import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userLogin } from './dto/user-login.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}
  async createUser(userDto: UserDto) {
    return this.userRepository.createUser(userDto);
  }
  async signIn(userLogin: userLogin) {
    const { email, password } = userLogin;
    const user = await this.userRepository.findOne({ email });
    let match = await user.validatePassword(password);
    console.log(user);
    if (!match) {
      throw new UnauthorizedException();
    } else return 'login ok';
  }
}
