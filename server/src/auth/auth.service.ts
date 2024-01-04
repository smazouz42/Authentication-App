import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private  prismaService: PrismaService
  ) {}
  async signUp(userData : AuthDto) {
    const user = await this.prismaService.user.create({
      data: {
        email: userData.email,
        
      }
    })
    // Implement your signUp logic here

  }

  async signIn(userData : AuthDto) {
    // Implement your signIn logic here
  }
}