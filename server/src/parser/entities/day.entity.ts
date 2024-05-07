import { LessonEntity } from './lesson.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DayEntity {
  @ApiProperty({ example: 'Понедельник' })
  day: string;
  @ApiProperty({ type: LessonEntity, isArray: true })
  lessons: LessonEntity[];
}
