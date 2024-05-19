import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pagination } from '../@types/pagination';

@Injectable()
export class NewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(page?: number, limit?: number) {
    if (!page || !limit) {
      return this.prismaService.news.findMany();
    }

    const totalElements = await this.prismaService.news.count();

    const data = await this.prismaService.news.findMany({
      skip: (+page - 1) * +limit,
      take: +limit,
    });

    return new Pagination(data, {
      currentPage: +page,
      perPage: +limit,
      totalElements,
      totalPages: Math.ceil(totalElements / limit),
    });
  }

  findOne(id: number) {
    return this.prismaService.news.findFirst({
      where: {
        id,
      },
    });
  }
}
