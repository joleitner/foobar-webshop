import { Injectable } from '@nestjs/common';
import { env } from 'process';

@Injectable()
export class PaymentService {
  // creates and verifies payment with C4 payment interface
  async create(order: any, card: string): Promise<any> {
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

    try {
      const res = await fetch(`${env.C4_ENDPOINT}/payment`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          api_key: env.C4_API_KEY,
        },
      });
      const payment = await res.json();

      return payment;
    } catch (error) {
      console.error('Payment creation failed:', error);
    }
  }

  // gets payment status from C4 payment interface
  async getStatus(orderId: string): Promise<any> {
    try {
      const res = await fetch(`${env.C4_ENDPOINT}/payment/${orderId}`, {
        method: 'GET',
        headers: { api_key: env.C4_API_KEY },
      });

      const payment = await res.json();
      return payment;
    } catch (error) {
      console.error('Payment status updated failed:', error);
    }
  }
}
