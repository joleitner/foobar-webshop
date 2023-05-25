import ArticleList from './components/Articles/ArticleList';

export default function HomePage() {
  return (
    <div className="container">
      {/* @ts-expect-error Async Server Component */}
      <ArticleList />
    </div>
  );
}
