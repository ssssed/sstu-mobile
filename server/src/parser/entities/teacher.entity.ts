import { ApiProperty } from '@nestjs/swagger';

export class TeacherEntity {
  @ApiProperty({ example: 'Иванов И.И.' })
  name: string;
  @ApiProperty({
    example: 'https://www.sstu.ru/teachers/1111-ivanov_ivan_ivanovich.html',
  })
  href: string;
}
