import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order, Prisma } from '@prisma/client';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private warehouse: WarehouseService,
    private payment: PaymentService,
  ) {}

  async getOrder(id: string): Promise<Order> {
    let order: any = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        articles: {
          include: {
            article: true,
          },
        },
      },
    });
    if (!order) {
      return null;
    }

    if (order.status === 'PENDING') {
      const payment = await this.payment.getStatus(order.id);

      try {
        order = await this.prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: payment.status.toUpperCase(),
            invoice: payment.invoice !== 'invoice' ? payment.invoice : null,
          },
          include: {
            articles: {
              include: {
                article: true,
              },
            },
          },
        });
        // if payment was successful, send delivery request
        if (order.status === 'ACCEPTED') {
          const res = await this.warehouse.sendDeliveryRequest(order);
          if (res.$metadata.httpStatusCode !== 200) {
            console.error('Delivery request failed:', res);
            // usually do something..
          }
        }
      } catch (error) {
        console.error('Failed to update order:', error);
      }
    }

    // somtimes the invoice was not directly available -> refetch
    if (order.status === 'ACCEPTED' && order.invoice === null) {
      const payment = await this.payment.getStatus(order.id);

      order = await this.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          invoice: payment.invoice !== 'invoice' ? payment.invoice : null,
        },
      });
    }

    return order;
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

    const payment = await this.payment.create(order, card);
    if (payment) {
      // after payment is verified, update order status
      const updatedOrder = await this.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: payment.status.toUpperCase(),
        },
        include: {
          articles: {
            include: {
              article: true,
            },
          },
        },
      });

      return updatedOrder;
    } else {
      // in case of payment failure, delete order
      this.prisma.order.delete({
        where: {
          id: order.id,
        },
      });
      return null;
    }
  }

  async updateDeliveryStatus(): Promise<void> {
    await this.warehouse.updateDeliveryStatus();
  }
}
