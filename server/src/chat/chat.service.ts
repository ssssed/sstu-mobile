// chat.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {
  }

  async createChat(userId: number) {
    return this.prisma.chat.create({
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
  }

  async addMessage(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: dto,
      select: {
        id: true,
        content: true,
        chat_id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            groupName: true,
            studentNumber: true,
          },
        },
      },
    });
  }

  async getMessages(chatId: number) {
    return this.prisma.message.findMany({
      where: {
        chat_id: chatId,
      },
      select: {
        id: true,
        content: true,
        chat_id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            groupName: true,
            studentNumber: true,
          },
        },
      },
    });
  }

  // Другие методы для работы с чатами и сообщениями
}
