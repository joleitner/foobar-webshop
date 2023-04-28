import { Article } from '@/app/types';
import ArticleComp from './Article';
import { api } from '@/config';

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${api}/articles`);
  const articles = await res.json();

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
