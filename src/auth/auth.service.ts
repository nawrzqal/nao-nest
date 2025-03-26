import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto  } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { resultUserDto } from './dto/result-atuh.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
   async login(loginUser: LoginUserDto): Promise<String> {
    const user = await this.usersService.findByEmail(loginUser.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginUser.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { _id: user._id, email: user.email, userType: user.userType };
    const token = await this.jwtService.signAsync(payload);
    return token;
  } 

  
}

