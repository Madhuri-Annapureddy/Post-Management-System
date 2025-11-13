import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import { usePosts } from "../App.jsx";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = usePosts();

  const post = useMemo(() => posts.find((item) => item.id === id), [posts, id]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (formValues) => {
    const updated = updatePost(post.id, formValues);
    if (updated) {
      navigate(`/posts/${post.id}`);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Edit post</h1>
          <p className="text-sm text-slate-500">
            Update the information below and save your changes.
          </p>
        </div>
        <Link
          to={`/posts/${post.id}`}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Back to post
        </Link>
      </div>
      <PostForm initialValues={post} onSubmit={handleSubmit} submitLabel="Update Post" />
    </section>
  );
}

export default EditPostPage;


