import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import cheerio from 'cheerio';
import { GroupDto } from './dto/group.dto';
import { Prisma } from 'prisma';
import { PrismaService } from '../prisma/prisma.service';
import { DayEntity } from './entities/day.entity';
import { cleanText } from './lib/text';
import { NewsDto } from './dto/news.dto';

@Injectable()
export class ParserService {
  private readonly logger = new Logger(ParserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async parseSchedule(groupDto: GroupDto) {
    const group = await this.prismaService.group.findFirst({
      where: { name: groupDto.name },
    });

    let data;

    try {
      const response = await axios.get<string>(
        `${process.env.SSTU_RASP_URL}/${group.groupId}`,
        {
          headers: {
            'User-Agent': this.generateUserAgent(),
          },
        },
      );

      data = response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        data = e.response.data;
      }
    }

    const $ = cheerio.load(data);

    const weeks = $('.week').toArray().slice(0, 3);
    const weeksJson = [];

    for (const week of weeks) {
      const days = $(week).find('.day').toArray().slice(1);
      for (const day of days) {
        const dayOfWeek = $(day).find('.day-header').find('span').text();
        const lessons = [];
        for (const lesson of $(day).find('.day-lesson').toArray()) {
          if ($(lesson).hasClass('day-lesson-empty')) continue;
          const hour = $(lesson).find('.lesson-hour').text().slice(0, -1);
          const room = $(lesson).find('.lesson-room').text();
          const name = $(lesson).find('.lesson-name').text();
          const type = $(lesson).find('.lesson-type').text();
          lessons.push({
            hour,
            room,
            name,
            type,
            teacher: {
              name: $(lesson).find('.lesson-teacher').find('a').text(),
              href: $(lesson).find('.lesson-teacher').find('a').attr('href'),
            },
          });
        }

        weeksJson.push({
          day: dayOfWeek,
          lessons,
        } as DayEntity);
      }
    }

    return weeksJson as DayEntity[];
  }

  async apiParseGroups() {
    return this.prismaService.group.findMany();
  }

  async parseGroups() {
    let data;
    try {
      const response = await axios.get<string>(process.env.SSTU_GROUPS_URL, {
        headers: {
          'User-Agent': this.generateUserAgent(),
        },
      });

      data = response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        data = e.response.data;
      }
    }

    const $ = cheerio.load(data, {});
    const regex = /\/rasp\/group\/\d+/;
    this.logger.log('Parsing groups...');
    const links = $('a')
      .get()
      .filter((el) => {
        const href = $(el).attr('href');
        return regex.test(href);
      });

    const groups: Prisma.GroupCreateManyInput[] = links.map((link) => {
      const href = $(link).attr('href');
      const name = $(link).text();
      const groupId = +href.split('/').at(-1);
      return { name, href, groupId };
    });

    this.logger.log('Clear table...');
    await this.prismaService.group.deleteMany();
    this.logger.log('Table clear!');

    this.logger.log('Update table...');
    const dbData = await this.prismaService.group.createMany({
      data: groups,
      skipDuplicates: true,
    });
    this.logger.log('Groups updated');

    return groups;
  }

  private async serializeNewsPageToJson(html: string) {
    const $ = cheerio.load(html, {});
    const news = $('.news-item');

    const pageNews = [];

    for (const item of news) {
      const imageEl = $(item).find('.news-item__img');
      const img = $(imageEl).find('img').get(0);
      const link = $(imageEl).attr('href');
      const image = $(img).attr('src');

      const tag = cleanText($(item).find('.news-item__tag').text());
      const date = cleanText($(item).find('.news-item__date').text());
      const titleEl = $(item).find('.news-item__title').get(0);
      const title = cleanText($($(titleEl).find('a').get(0)).text());
      const description = cleanText(
        $($(item).find('.news-item__desc').get(0)).text(),
      );

      pageNews.push({
        link,
        image,
        tag,
        date,
        title,
        description,
      });
    }

    return pageNews;
  }

  async parseNewsPage(page: string | number) {
    const { data } = await axios.get<string>(process.env.SSTU_NEWS_URL, {
      headers: {
        'User-Agent': this.generateUserAgent(),
      },
      params: {
        PAGEN_1: page,
      },
    });

    return this.serializeNewsPageToJson(data);
  }

  async parseNews(): Promise<NewsDto[]> {
    const { data } = await axios.get<string>(process.env.SSTU_NEWS_URL, {
      headers: {
        'User-Agent': this.generateUserAgent(),
      },
    });
    const $ = cheerio.load(data, {});

    let currentPage = 1;

    const pagination = $('.pagination');
    const link = $(pagination).find('a').get().at(-1);

    const lastPage = $(link).attr('href').split('=').at(-1);

    const response = [];

    const firstPage = this.serializeNewsPageToJson(data);
    this.logger.debug(`[ PAGE ${currentPage}/${lastPage} ] :: was parsed`);

    response.push(...(await firstPage));

    while (currentPage < +lastPage) {
      const parsingPage = await this.parseNewsPage(++currentPage);
      this.logger.debug(`[ PAGE ${currentPage}/${lastPage} ] :: was parsed`);
      response.push(...parsingPage);
    }

    this.logger.log('Clear table...');
    await this.prismaService.news.deleteMany();
    this.logger.log('Table clear!');

    this.logger.log('Update table...');
    const dbData = await this.prismaService.news.createMany({
      data: response,
      skipDuplicates: true,
    });
    this.logger.log('News updated');

    this.logger.log('[ dbData ] ::', dbData);

    return response;
  }

  private generateUserAgent(): string {
    // Пример генерации уникального User-Agent
    const userAgentPrefix =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    const randomSuffix = Math.floor(Math.random() * 1000000);
    return `${userAgentPrefix} ${randomSuffix}`;
  }
}
