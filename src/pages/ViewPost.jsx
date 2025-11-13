import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal.jsx";
import { usePosts } from "../App.jsx";

function formatDateTime(value) {
  if (!value) return "Unknown";
  try {
    return new Date(value).toLocaleString();
  } catch (error) {
    return value;
  }
}

function ViewPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost } = usePosts();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const post = useMemo(() => posts.find((item) => item.id === id), [posts, id]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = () => {
    deletePost(post.id);
    setConfirmOpen(false);
    navigate("/");
  };

  return (
    <article className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{post.title}</h1>
          <p className="mt-1 text-sm text-slate-500">By {post.author}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Back to list
          </Link>
          <Link
            to={`/posts/${post.id}/edit`}
            className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-slate-500">
        <p>
          <span className="font-semibold text-slate-600">Created:</span>{" "}
          {formatDateTime(post.createdAt)}
        </p>
        <p>
          <span className="font-semibold text-slate-600">Last updated:</span>{" "}
          {formatDateTime(post.updatedAt)}
        </p>
      </div>

      <div className="prose max-w-none text-slate-700">
        <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {post.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <ConfirmModal
        open={confirmOpen}
        title="Delete post?"
        description="This post will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </article>
  );
}

export default ViewPostPage;


