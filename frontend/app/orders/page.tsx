'use client';

import { useState } from 'react';
import { nextApi } from '@/config';
import Orders from '@/app/utils/orders';
import { Order } from '../types';

export default function OrdersPage() {
  const [orderList, setOrderList] = useState<Order[]>([]);

  const orders = new Orders();

  async function getOrders() {
    const orderIds = orders.getOrders();
    for (const id of orderIds) {
      const res = await fetch(`${nextApi}/orders/${id}`);
      const order = await res.json();
      setOrderList((orderList) => [...orderList, order]);
    }
  }

  // Check if localStorage is defined before calling getOrders
  if (typeof localStorage !== 'undefined') {
    getOrders();
  }

  // if no orders exist yet
  if (orders.getOrders().length === 0) {
    return (
      <>
        <h3>Orders</h3>
        <article>
          <div>No orders yet</div>
        </article>
      </>
    );
  }

  if (orderList.length === 0) {
    return (
      <>
        <h3>Orders</h3>
        <article>
          <progress></progress>
        </article>
      </>
    );
  }

  return (
    <>
      <h3>Orders</h3>
      {orderList?.map((order) => (
        <article key={order.id}>
          <div>{order.id}</div>
        </article>
      ))}
    </>
  );
}
