import { api } from '@/config';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const res = await fetch(`${api}/orders/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const order = await res.json();
  return NextResponse.json(order);
}
