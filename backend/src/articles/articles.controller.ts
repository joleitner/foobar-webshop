import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article as ArticleModel } from '@prisma/client';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async articles(): Promise<ArticleModel[]> {
    return this.articlesService.articles();
  }

  @Post()
  async createArticle(
    @Body() postData: { name: string; description: string; price: number },
  ): Promise<ArticleModel> {
    const { name, description, price } = postData;
    return this.articlesService.createArticle({
      name,
      description,
      price,
    });
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<ArticleModel> {
    return this.articlesService.deleteArticle(Number(id));
  }
}
