import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUser {
  @ApiProperty({
    default: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: null,
      phone: '79999999999',
      status: 'Active',
    },
  })
  user: Omit<User, 'password'>;
  @ApiProperty({ default: 'token-ssh' })
  token: string;
}
