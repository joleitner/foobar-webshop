import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, ArticlesController, OrdersController],
  providers: [AppService, ArticlesService, OrdersService, PrismaService],
})
export class AppModule {}
