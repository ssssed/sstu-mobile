import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto implements Pick<User, 'phone' | 'password'> {
  @ApiProperty({ default: '79999999999' })
  phone: string;
  @ApiProperty({ default: 'Password123' })
  password: string;
}
