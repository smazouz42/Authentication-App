import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService
  ) { }
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  async signUp(userData: AuthDto, res : Response) {
    console.log(userData)
    const hashedPassword = await this.hashPassword(userData.password)
    try {
    const user = await this.prismaService.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        username: userData.username
      },
    })
    return (user);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
  }

  async signIn(userData: AuthDto) {
    // Implement your signIn logic here
  }
}