'use client';

import { useState, useEffect } from 'react';
import Orders from '@/app/utils/orders';
import { Order } from '../types';
import OrderItem from './OrderItem';

export default function OrderList() {
  const [orderList, setOrderList] = useState<string[]>([]);

  useEffect(() => {
    const orders = new Orders();
    const localOrders = orders.getOrders();
    setOrderList(localOrders);
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
