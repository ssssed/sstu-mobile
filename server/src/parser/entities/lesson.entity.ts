import { TeacherEntity } from './teacher.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LessonEntity {
  @ApiProperty({ example: '8:00 - 9:30' })
  hour: string;
  @ApiProperty({ example: '5/336' })
  room: string;
  @ApiProperty({ example: 'Разработка мобильных приложений' })
  name: string;
  @ApiProperty({ example: '(прак)' })
  type: string;
  @ApiProperty({ type: TeacherEntity })
  teacher: TeacherEntity;
}
