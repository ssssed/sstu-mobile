import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';
import { join } from 'path';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MessagesReq } from './dto/messages.req';
import { CreateChat } from './dto/create-chat';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  getChatPage(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'src/assets/chat.html'));
  }

  @ApiBody({
    type: CreateChat,
  })
  @Post('create')
  async createChat(@Body('userId') userId: number) {
    return this.chatService.createChat(userId);
  }

  @ApiBody({ type: MessagesReq })
  @Post('messages')
  async getMessages(@Body('chatId') chatId: number) {
    return this.chatService.getMessages(chatId);
  }
}
