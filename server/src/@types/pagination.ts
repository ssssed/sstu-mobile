import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty({ example: [] })
  data: T[];
  @ApiProperty()
  meta: Meta;

  constructor(data: T[], meta: Meta) {
    this.data = data;
    this.meta = meta;
  }
}
