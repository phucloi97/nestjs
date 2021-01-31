import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './decorator/user.decorator';
import { userLogin } from './dto/user-login.dto';
import { UserDto } from './dto/user.dto';
import { JwtUserGaurd } from './jwt-user.gaurd';
import { UserService } from './user.service';
// import { SendMail } from '../helper/send-mail.helper';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Redirect('localhost:3000/user/signin', 200)
  async createUser(@Body() userDto: UserDto) {
    console.log(userDto);
    this.userService.createUser(userDto);
  }
  @Post('/signin')
  async signIn(@Body() userLogin: userLogin) {
    return this.userService.signIn(userLogin);
  }
  @UseGuards(JwtUserGaurd)
  @Get('/validate')
  async validate(@User() user_name: string) {
    return user_name;
  }
}
