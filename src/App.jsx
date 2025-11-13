import { createContext, useContext, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Toast from "./components/Toast.jsx";
import HomePage from "./pages/Home.jsx";
import CreatePostPage from "./pages/CreatePost.jsx";
import ViewPostPage from "./pages/ViewPost.jsx";
import EditPostPage from "./pages/EditPost.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { normalizeTags } from "./utils/validators.js";

const PostsContext = createContext(null);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within PostsProvider");
  }
  return context;
};

const STORAGE_KEY = "post-management-system::posts";

function App() {
  const [posts, setPosts] = useLocalStorage(STORAGE_KEY, []);
  const [toast, setToast] = useState(null);

  const showToast = (message, tone = "success") => {
    const toastId = crypto.randomUUID();
    setToast({ message, tone, id: toastId });
    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        setToast((current) => (current?.id === toastId ? null : current));
      }, 2400);
    }
  };

  const createPost = (data) => {
    const timestamp = new Date().toISOString();
    const newPost = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      author: data.author.trim(),
      content: data.content.trim(),
      tags: normalizeTags(data.tags),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setPosts((prev) => [...prev, newPost]);
    showToast("Post created successfully.");
    return newPost;
  };

  const updatePost = (id, data) => {
    let updatedPost = null;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post;

        updatedPost = {
          ...post,
          title: data.title.trim(),
          author: data.author.trim(),
          content: data.content.trim(),
          tags: normalizeTags(data.tags),
          updatedAt: new Date().toISOString(),
        };

        return updatedPost;
      })
    );

    if (updatedPost) {
      showToast("Post updated successfully.");
    }

    return updatedPost;
  };

  const deletePost = (id) => {
    let removed = null;
    setPosts((prev) => {
      const remaining = prev.filter((post) => {
        if (post.id === id) {
          removed = post;
          return false;
        }
        return true;
      });
      return remaining;
    });

    if (removed) {
      showToast("Post deleted.");
    }
    return removed;
  };

  const contextValue = useMemo(
    () => ({
      posts,
      createPost,
      updatePost,
      deletePost,
      showToast,
    }),
    [posts]
  );

  return (
    <PostsContext.Provider value={contextValue}>
      <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/posts/new" element={<CreatePostPage />} />
            <Route path="/posts/:id" element={<ViewPostPage />} />
            <Route path="/posts/:id/edit" element={<EditPostPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </div>
    </PostsContext.Provider>
  );
}

export default App;


