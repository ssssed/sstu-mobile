import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('ChatGateway');
  @WebSocketServer() server: Server;
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() message: CreateMessageDto,
    client: Socket,
  ) {
    const response = await this.chatService.addMessage(message);
    this.server.emit('receiveMessage', response);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ' + client.id);
  }

  // Другие методы для обработки событий в реальном времени
}
