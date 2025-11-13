import { Link, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import { usePosts } from "../App.jsx";

function CreatePostPage() {
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = (formValues) => {
    const newPost = createPost(formValues);
    if (newPost) {
      navigate(`/posts/${newPost.id}`);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create a new post</h1>
          <p className="text-sm text-slate-500">
            Fill in the details below to publish a new post.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Back to list
        </Link>
      </div>
      <PostForm onSubmit={handleSubmit} submitLabel="Create Post" />
    </section>
  );
}

export default CreatePostPage;


