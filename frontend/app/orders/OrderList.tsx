'use client';

import { useState, useEffect } from 'react';
import { nextApi } from '@/config';
import Orders from '@/app/utils/orders';
import OrderItem from './OrderItem';

async function triggerUpdateDeliveryStatus() {
  const response = await fetch(`${nextApi}/orders/update`, {
    next: { revalidate: 10 },
  });
}

export default function OrderList() {
  const orders = new Orders();
  const [orderList, setOrderList] = useState<string[]>([]);

  useEffect(() => {
    triggerUpdateDeliveryStatus();
    setOrderList(orders.getOrders());
  }, []);

  // if no orders exist yet
  if (orderList.length === 0) {
    return (
      <>
        <article className="center">
          <div>No orders yet</div>
        </article>
      </>
    );
  }

  return (
    <>
      <article>
        {orderList?.map((orderId) => {
          return <OrderItem key={orderId} orderId={orderId} />;
        })}
      </article>
    </>
  );
}
