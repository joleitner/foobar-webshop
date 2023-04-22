import ArticleComp, { Article } from './Article';

function getArticles(): Article[] {
  const articles: Article[] = [
    {
      id: 1,
      name: 'Article 1',
      description: 'Hello this is a weird description',
      price: 10.22,
    },
    {
      id: 2,
      name: 'Article 2',
      description: 'Hello this is a weird description',
      price: 40,
    },
    {
      id: 3,
      name: 'Article 3',
      description: 'Hello this is a weird description',
      price: 345,
    },
  ];
  // const res = await fetch();
  // const data = res.json()

  return articles;
}

export default function ArticleList() {
  const articles = getArticles();

  return (
    <div className="margin-large container">
      {articles?.map((article) => {
        return <ArticleComp key={article.id} article={article} />;
      })}
    </div>
  );
}
