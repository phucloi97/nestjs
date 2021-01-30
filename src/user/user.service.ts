import { Injectable } from '@nestjs/common';
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
    return 'ok';
  }
}