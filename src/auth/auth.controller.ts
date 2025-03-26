import { Body, Controller, Get, HttpCode, HttpStatus,Request , Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { AuhtGuard } from './atuh.guard';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    // make the route public
    @Public()
    @Post('login')
    Login(@Body() LoginUser: LoginUserDto) {
      return this.authService.login(LoginUser);
    }

    @UseGuards(AuhtGuard)
    @Get('profile')
    getProfile(@Request() req: Request) {
      return req['user'];
    }
}
