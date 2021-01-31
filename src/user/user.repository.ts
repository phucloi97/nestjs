import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: UserDto) {
    const { user_name, email, password } = userDto;
    const { salt, code, hashPass } = await this.hashPassword(10, password);
    const user = new User();
    user.code = +code;
    user.user_name = user_name;
    user.email = email;
    user.password = hashPass;
    user.salt = salt;
    user.role = UserRole.Customer;
    await user.save();
    return user;
  }
  private async hashPassword(saltRound, password) {
    const salt = await bcrypt.genSalt(saltRound);
    const code = [...Array(6)]
      .map((i) => (Math.random() * 5).toFixed(0))
      .join('');
    const hashPass = await bcrypt.hash(password, salt);
    return { salt, code, hashPass };
  }
}
