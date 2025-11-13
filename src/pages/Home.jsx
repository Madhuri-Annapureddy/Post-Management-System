import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Pagination from "../components/Pagination.jsx";
import PostCard from "../components/PostCard.jsx";
import { usePosts } from "../App.jsx";

const POSTS_PER_PAGE = 6;

function HomePage() {
  const { posts, deletePost } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postToDelete, setPostToDelete] = useState(null);

  const authors = useMemo(
    () => Array.from(new Set(posts.map((post) => post.author))).sort(),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesAuthor = authorFilter === "all" || post.author === authorFilter;
      const matchesSearch =
        term.length === 0 ||
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(term));
      return matchesAuthor && matchesSearch;
    });
  }, [posts, searchTerm, authorFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, authorFilter, posts.length]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleDeleteRequest = (post) => {
    setPostToDelete(post);
  };

  const handleDeleteConfirm = () => {
    if (!postToDelete) return;
    deletePost(postToDelete.id);
    setPostToDelete(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Posts</h1>
          <p className="text-sm text-slate-500">
            Manage your posts, search by keyword, or filter by author.
          </p>
        </div>
        <Link
          to="/posts/new"
          className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          + Create Post
        </Link>
      </div>

      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="text-sm font-semibold text-slate-600">
            Search
          </label>
          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title, content, or tag"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="author" className="text-sm font-semibold text-slate-600">
            Filter by author
          </label>
          <select
            id="author"
            value={authorFilter}
            onChange={(event) => setAuthorFilter(event.target.value)}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <option value="all">All authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-700">No posts found</p>
          <p className="mt-2 text-sm text-slate-500">
            Try adjusting your search or create a new post to get started.
          </p>
          <Link
            to="/posts/new"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDeleteRequest} />
            ))}
          </section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <ConfirmModal
        open={Boolean(postToDelete)}
        title="Delete post?"
        description={`Are you sure you want to delete “${postToDelete?.title ?? ""}”? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPostToDelete(null)}
      />
    </section>
  );
}

export default HomePage;


