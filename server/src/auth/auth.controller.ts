import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: AuthDto) {
    this.authService.signUp(signUpDto)
  }

  @Post('signin')
  async signIn(@Body() signInDto: AuthDto) {
    this.authService.signIn(signInDto)
  }
}