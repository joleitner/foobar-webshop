import { Article, Cart } from '@/app/types';
import { Trash2 } from 'react-feather';
import { useState, useEffect } from 'react';

export default function CartItem({
  article,
  amount,
}: {
  article: Article;
  amount: number;
}) {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    const json = localStorage.getItem('shopping-cart');
    if (json) {
      setCart(JSON.parse(json));
    }
  }, []);

  function deleteArticle() {
    delete cart[article.id];
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    setCart(cart);
    window.location.reload();
  }

  return (
    <tr>
      <td>{article.name}</td>
      <td>{article.price}</td>
      <td>{amount}</td>
      <td>{article.price * amount}</td>
      <td>
        <div onClick={deleteArticle}>
          <Trash2 />
        </div>
      </td>
    </tr>
  );
}
