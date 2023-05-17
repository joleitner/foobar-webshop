'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { nextApi } from '@/config';
import { Order } from '../types';
import { Download } from 'react-feather';

async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${nextApi}/orders/${id}`);
  const order = await res.json();
  return order;
}

export default function OrderItem({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    getOrder(orderId).then((order) => {
      setOrder(order);
    });
  }, [orderId]);

  if (!order) {
    return (
      <details>
        <summary>Loading</summary>
        <progress />
      </details>
    );
  }

  return (
    <details open>
      <summary>
        <div className="grid">
          <div>{order.id}</div>
          <strong>{order.status}</strong>
        </div>
      </summary>
      {order.status === 'DECLINED' ? (
        <div>
          <strong>Payment declined</strong>
          <div>
            Your card was declined. Please try again with a different card.
          </div>
        </div>
      ) : (
        <div className="grid">
          <div>
            <div>
              {order.name} ({order.email})
            </div>
            <strong>Address</strong>
            <div>{order.address}</div>
            <div>
              {order.zip} {order.city}
            </div>
          </div>
          <div>
            <div>
              <strong>Total:</strong> {order.sum} €
            </div>
            <div>
              <Link href={order.invoice}>
                <Download /> invoice
              </Link>
            </div>
          </div>
        </div>
      )}
    </details>
  );
}
