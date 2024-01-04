import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() signUpDto: AuthDto, @Res() res: Response) {
    console.log('body:', signUpDto);
    try {
      this.authService.signUp(signUpDto, res)
    }
    catch (error) {
      res.status(400).json({error: error.message});
    }
  }
  @Post('signin')
  async signIn(@Body() signInDto: AuthDto) {
    this.authService.signIn(signInDto)
  }
}