import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        phone: true,
        avatar: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        phone: true,
        avatar: true,
        firstName: true,
        lastName: true,
      },
    });
  }
}
