import { Body, Controller, Get, HttpCode, HttpStatus,Request , Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/public.decorator';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOkResponse({type: LoginUserDto})
    @HttpCode(HttpStatus.OK)
    // make the route public
    @Public()
    @Post('login')
    Login(@Body() LoginUser: LoginUserDto) {
      return this.authService.login(LoginUser);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: Request) {
      return req['user'];
    }
}
