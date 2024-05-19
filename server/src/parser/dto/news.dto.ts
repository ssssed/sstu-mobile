import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class NewsDto implements Prisma.NewsCreateInput {
  @ApiProperty()
  date: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  link: string;
  @ApiProperty()
  tag: string;
  @ApiProperty()
  title: string;
}
