'use client';

import { nextApi } from '@/config';
import { Order } from '../types';

async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${nextApi}/orders/${id}`);
  const order = await res.json();
  return order;
}

export default async function OrderItem({ orderId }: { orderId: string }) {
  const order = await getOrder(orderId);

  if (!order) {
    return (
      <article>
        <progress />
      </article>
    );
  }

  return (
    <article>
      <div>{order.id}</div>
      <div>{order.status}</div>
    </article>
  );
}
