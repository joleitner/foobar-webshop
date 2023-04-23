import AddCartButton from './AddCartButton';
import { ShoppingBag } from 'react-feather';
import { Article } from '@/app/types';

export default function Article({ article }: { article: Article }) {
  return (
    <article>
      <h3>
        <ShoppingBag />
        &nbsp;&nbsp;&nbsp;
        {article.name}
      </h3>
      <p>{article.description}</p>
      <h4 className="strong right">€ {article.price} &nbsp;</h4>
      <AddCartButton article={article} />
    </article>
  );
}
