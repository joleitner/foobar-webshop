import { api } from '@/config';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await fetch(`${api}/orders/update`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const order = await res.json();
  return NextResponse.json(order);
}
