import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty({ example: 'б1-ПИНФ-32' })
  name: string;
}
