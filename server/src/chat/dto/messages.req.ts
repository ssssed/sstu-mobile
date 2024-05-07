import { ApiProperty } from '@nestjs/swagger';

export class MessagesReq {
  @ApiProperty({ default: 1 })
  chat_id: number;
}
