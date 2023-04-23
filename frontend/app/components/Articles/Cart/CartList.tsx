'use client';

import { useState, useEffect } from 'react';
import { Cart } from '../../../types';
import CartItem from './CartItem';
import Link from 'next/link';

export default function CartList() {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    const json = localStorage.getItem('shopping-cart');
    if (json) {
      setCart(JSON.parse(json));
    }
    calculateCartTotal();
  }, []);

  function calculateCartTotal() {
    let total = 0;
    Object.keys(cart).forEach((key) => {
      const articleId = parseInt(key);
      if (typeof articleId === 'number') {
        total += cart[articleId].article.price * cart[articleId].amount;
      }
    });
    return total;
  }

  if (Object.keys(cart).length === 0) {
    return <div className="center">No items in cart yet"</div>;
  }

  return (
    <div>
      <table role={Object.keys(cart).length > 0 ? 'grid' : ''}>
        <thead>
          <tr>
            <th scope="col">Article</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {/* map over all numerical keys of cart and create a column with values*/}
        <tbody>
          {Object.keys(cart).map((key) => {
            console.log(typeof key);
            const articleId = parseInt(key);
            if (typeof articleId === 'number') {
              return (
                <CartItem
                  key={articleId}
                  article={cart[articleId].article}
                  amount={cart[articleId].amount}
                />
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td>{calculateCartTotal()}</td>
          </tr>
        </tfoot>
      </table>
      <div className="center">
        <Link href="checkout" role="button">
          Continue to checkout
        </Link>
      </div>
    </div>
  );
}
