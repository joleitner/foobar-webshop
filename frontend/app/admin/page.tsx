import Link from 'next/link';

export default function AdminPage() {
  return (
    <>
      <h3>Admin</h3>
      <article>
        <div className="center">
          <Link href="/admin/articles" role="button">
            Create a new article
          </Link>
        </div>
      </article>
    </>
  );
}
