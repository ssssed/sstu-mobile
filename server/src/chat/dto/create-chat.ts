import { ApiProperty } from '@nestjs/swagger';

export class CreateChat {
  @ApiProperty({ example: '1' })
  userId: number;
}
