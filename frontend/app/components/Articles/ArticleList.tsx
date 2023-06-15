import { Article } from '@/app/types';
import ArticleComp from './Article';
import { nextApi } from '@/config';
import Link from 'next/link';

async function getArticles(): Promise<Article[]> {
  const response = await fetch(`http://127.0.0.1:3000/api/articles`, {
    cache: 'no-store',
  });
  const articles = await response.json();
  return articles;
}

export default async function ArticleList() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <div>
        <progress></progress>
        <div className="center">
          <Link href="admin/articles" role="button">
            Create an article as admin
          </Link>
        </div>
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
