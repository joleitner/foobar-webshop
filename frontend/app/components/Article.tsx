export type Article = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function Article({ article }: { article: Article }) {
  return (
    <article>
      <h3>{article.name}</h3>
      <p>€ {article.price}</p>
      <p>{article.description}</p>
      <button>Add to cart</button>
    </article>
  );
}
