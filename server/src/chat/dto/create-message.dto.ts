import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  chat_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  content: string;
}
