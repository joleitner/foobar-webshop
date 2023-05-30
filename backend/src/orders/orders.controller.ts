import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order as OrderModel } from '@prisma/client';
import { json } from 'stream/consumers';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // to reload delivery status
  // here triggered mannually -> usually this should be triggerd regularly by a cronjob
  @Get('update')
  async updateDeliveryStatus(): Promise<{}> {
    await this.ordersService.updateDeliveryStatus();
    return { status: 'updated' };
  }

  @Get(':id')
  async order(@Param() params: any) {
    if (params.id === 'undefined') {
      return { status: 'no correct id' };
    }
    return this.ordersService.getOrder(params.id);
  }

  @Post()
  async createOrder(
    @Body()
    postData: {
      name: string;
      email: string;
      address: string;
      city: string;
      zip: string;
      card: string;
      sum: number;
      cart: object;
    },
  ): Promise<OrderModel> {
    const { name, email, address, city, zip, card, sum, cart } = postData;
    const articles = {};
    for (const [key, value] of Object.entries(cart)) {
      articles[key] = value.amount;
    }

    return this.ordersService.createOrder(
      {
        name,
        email,
        address,
        city,
        zip,
        sum,
        articles,
      },
      card,
    );
  }
}
