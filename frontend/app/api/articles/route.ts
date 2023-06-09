import { api } from '@/config';
import { NextResponse } from 'next/server';
// import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const res = await fetch(`${api}/articles`, {
    cache: 'no-store',
  });
  const articles = await res.json();

  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const { name, description, price } = await request.json();
  const res = await fetch(`${api}/articles`, {
    method: 'POST',
    body: JSON.stringify({ name, description, price }),
    headers: { 'Content-Type': 'application/json' },
  });
  const article = await res.json();
  // revalidatePath('http://localhost:3000/');
  return NextResponse.json({
    status: 'success',
    message: 'Article created',
    article: article,
  });
}
