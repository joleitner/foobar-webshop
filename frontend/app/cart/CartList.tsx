'use client';

import CartItem from './CartItem';
import Link from 'next/link';
import ShoppingCart from '@/app/utils/shoppingCart';

export default function CartList() {
  const cart = ShoppingCart.getInstance();
  const cartItems = cart.getCart();

  if (cart.isEmpty()) {
    return (
      <article>
        <p className="center">No items in cart yet</p>
        <div className="center">
          <Link href="/" role="button">
            Start shopping
          </Link>
        </div>
      </article>
    );
  }

  return (
    <div>
      <table role={Object.keys(cartItems).length > 0 ? 'grid' : ''}>
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
          {Object.keys(cartItems).map((key) => {
            const articleId = parseInt(key);
            if (typeof articleId === 'number') {
              return (
                <CartItem
                  key={articleId}
                  article={cartItems[articleId].article}
                  amount={cartItems[articleId].amount}
                />
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td>{cart.calculateCartTotal()}</td>
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
