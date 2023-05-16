import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order, Prisma } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async orders(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async order(id: string): Promise<Order> {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  async createOrder(
    data: Prisma.OrderCreateInput,
    card: string,
  ): Promise<Order> {
    const order = await this.prisma.order.create({
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        zip: data.zip,
        sum: data.sum,
        articles: {
          create: Object.entries(data.articles).map(
            ([articleId, quantity]) => ({
              quantity: parseInt(quantity.toString()),
              article: { connect: { id: parseInt(articleId) } },
            }),
          ),
        },
      },
      include: {
        articles: {
          include: {
            article: true,
          },
        },
      },
    });

    const payment = await this.verifyPayment(order, card);
    // after payment is verified, update order status
    const updatedOrder = await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: payment.status.toUpperCase(),
      },
    });
    return updatedOrder;
  }

  private async verifyPayment(order: any, card: string): Promise<any> {
    // request body for C4 payment interface
    const request = {
      amount: Math.round(+order.sum * 100), // convert to cents
      currency: 'EUR',
      id: order.id,
      invoice: 'invoice',
      items: order.articles.map((item) => ({
        amount: Math.round(item.article.price * 100 * item.quantity),
        quantity: item.quantity,
        description: item.article.name,
        currency: 'EUR',
      })),
      email: order.email,
      card: {
        number: card,
      },
    };

    const res = await fetch(`${env.C4_ENDPOINT}/payment`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'Content-Type': 'application/json', api_key: env.C4_API_KEY },
    });

    const payment = await res.json();

    return payment;
  }

  private async getPaymentStatus(id: string): Promise<any> {
    const res = await fetch(`${env.C4_ENDPOINT}/payment/${id}`, {
      method: 'GET',
      headers: { api_key: env.C4_API_KEY },
    });

    const payment = await res.json();

    return payment;
  }
}
