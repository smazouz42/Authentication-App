import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: any) {
    console.log(signUpDto)
    // Implement your signUp logic here
  }

  @Post('signin')
  async signIn(@Body() signInDto: any) {
    console.log(signInDto)
    // Implement your signIn logic here
  }
}