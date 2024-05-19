import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsDto } from '../parser/dto/news.dto';
import { Pagination } from '../@types/pagination';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: Pagination<NewsDto>,
  })
  @ApiQuery({ name: 'page', required: false, description: 'текущая страница' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'количество элементов на 1 странице',
  })
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.newsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
}
