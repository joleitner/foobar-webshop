import { Article, Cart } from '@/app/types';
import { Trash2 } from 'react-feather';
import ShoppingCart from '@/app/utils/shoppingCart';

export default function CartItem({
  article,
  amount,
}: {
  article: Article;
  amount: number;
}) {
  const cart = ShoppingCart.getInstance();

  function deleteArticle() {
    cart.delete(article.id);
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
