import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExist } from './error/user-already-exist';
import { UserNotFound } from './error/user-not-found';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: Prisma.UserCreateInput) {
    const candidate = await this.prismaService.user.findUnique({
      where: { phone: dto.phone },
    });

    if (candidate) {
      throw new UserAlreadyExist();
    }

    const password = await this._hashPassword(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password,
      },
    });
    const { password: userPassword, ...userWithoutPassword } = user;

    const { chatId, ...payload } = userWithoutPassword;

    return { user: payload, token: this.jwtService.sign(payload) };
  }

  private async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async _checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async signin(dto: AuthUserDto) {
    const { phone, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { phone },
    });

    if (!user) {
      throw new UserNotFound();
    }

    const isMatch = await this._checkPassword(password, user.password);

    if (!isMatch) {
      throw new UserNotFound();
    }

    const { password: userPassword, chatId, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token: this.jwtService.sign(userWithoutPassword),
    };
  }
}
