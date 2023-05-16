import { Article } from '@/app/types';
import ArticleComp from './Article';
import { nextApi } from '@/config';

async function getArticles(): Promise<Article[]> {
  const response = await fetch(`${nextApi}/articles`, {
    next: { revalidate: 60 },
  });
  const articles = await response.json();
  return articles;
}

export default async function ArticleList() {
  const articles = await getArticles();

  if (articles == null) {
    return (
      <div>
        <progress></progress>
      </div>
    );
  }

  return (
    <div className="container">
      {articles?.map((article) => {
        return <ArticleComp key={article.id} article={article} />;
      })}
    </div>
  );
}
