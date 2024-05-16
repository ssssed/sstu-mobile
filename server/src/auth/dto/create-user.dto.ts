import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ default: '212000' })
  studentNumber: string;
  @ApiProperty({ default: 'б1-ПИНФ-32' })
  groupName: string;
  @ApiProperty({ default: null })
  status?: $Enums.UserStatus;
  @ApiProperty({ default: null })
  avatar: string | null;
  @ApiProperty({ default: 'John' })
  firstName: string;
  @ApiProperty({ default: 'Doe' })
  lastName: string;
  @ApiProperty({ default: '79999999999' })
  phone: string;
  @ApiProperty({ default: 'Password123' })
  password: string;
}
