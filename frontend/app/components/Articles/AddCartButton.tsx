'use client';

import { Article, Cart } from '@/app/types';
import ShoppingCart from '../../utils/shoppingCart';

export default function AddCartButton({ article }: { article: Article }) {
  const cart = ShoppingCart.getInstance();

  return (
    <button
      onClick={() => {
        cart.add(article);
      }}
    >
      Add to cart
    </button>
  );
}
