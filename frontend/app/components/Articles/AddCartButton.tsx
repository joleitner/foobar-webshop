'use client';

import { Article, Cart } from '@/app/types';

export default function AddCartButton({ article }: { article: Article }) {
  function addToCart() {
    const json = localStorage.getItem('shopping-cart');
    let cart: Cart = {};
    if (json) {
      cart = JSON.parse(json);
    }

    console.log(JSON.parse('{}'));
    // article is already in cart
    if (article?.id in cart) {
      cart[article.id].amount += 1;

      // if article is not in cart
    } else {
      cart[article.id] = {
        article,
        amount: 1,
      };
    }
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }

  return <button onClick={addToCart}>Add to cart</button>;
}
