'use client';

import Orders from '@/app/utils/orders';
import OrderItem from './OrderItem';

export default function OrderList() {
  const orders = new Orders();
  const orderList: string[] = orders.getOrders();

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
