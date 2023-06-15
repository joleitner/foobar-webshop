import { api } from '@/config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, address, city, zip, card, sum, cart } =
    await request.json();
  const res = await fetch(`${api}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      address,
      city,
      zip,
      card,
      sum,
      cart,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const order = await res.json();
  if (order == null) {
    return NextResponse.json({
      status: 'error',
      message: 'Order could not be created',
    });
  }
  return NextResponse.json({
    status: 'success',
    message: 'Order created',
    order: order,
  });
}
