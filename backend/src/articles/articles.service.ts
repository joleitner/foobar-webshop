import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async articles(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async createArticle(data: any): Promise<Article> {
    return this.prisma.article.create({
      data,
    });
  }

  async deleteArticle(id: number): Promise<Article> {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
