import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ParserService } from './parser.service';
import { GroupDto } from './dto/group.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DayEntity } from './entities/day.entity';

@ApiTags('parser')
@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @ApiBody({ type: GroupDto })
  @ApiResponse({ type: DayEntity, isArray: true, status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('schedule')
  parseSchedule(@Body() group: GroupDto) {
    return this.parserService.parseSchedule(group);
  }

  @Cron(CronExpression.EVERY_WEEK)
  parseGroups() {
    return this.parserService.parseGroups();
  }

  @HttpCode(HttpStatus.OK)
  @Get('groups')
  apiParseGroups() {
    return this.parserService.parseGroups();
  }
}
