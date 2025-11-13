import { Link } from "react-router-dom";

function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleString();
  } catch (error) {
    return isoString;
  }
}

function PostCard({ post, onDelete }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
          <p className="text-sm text-slate-500">by {post.author}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {formatDate(post.updatedAt)}
        </span>
      </header>
      <p className="mt-3 max-h-24 overflow-hidden text-sm leading-relaxed text-slate-600">
        {post.content}
      </p>
      <footer className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/posts/${post.id}`}
            className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            View
          </Link>
          <Link
            to={`/posts/${post.id}/edit`}
            className="rounded-md border border-brand px-2.5 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(post)}
            className="rounded-md border border-rose-500 px-2.5 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
}

export default PostCard;


