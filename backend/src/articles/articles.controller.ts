import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from '@prisma/client';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async articles(): Promise<Article[]> {
    return this.articlesService.articles();
  }

  @Post()
  async createArticle(
    @Body() postData: { name: String; description: String; price: number },
  ): Promise<Article> {
    return this.articlesService.createArticle(postData);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    return this.articlesService.deleteArticle(Number(id));
  }
}
