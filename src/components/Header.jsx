import { NavLink } from "react-router-dom";

const navLinkClasses =
  "rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800/10";

const activeClasses = "bg-slate-900 text-white hover:bg-slate-900";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-xl font-semibold text-slate-900">
          Post Management System
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeClasses : "text-slate-600"}`
            }
            end
          >
            Posts
          </NavLink>
          <NavLink
            to="/posts/new"
            className={({ isActive }) =>
              `${navLinkClasses} ${
                isActive ? activeClasses : "bg-brand text-white hover:bg-brand-dark"
              }`
            }
          >
            New Post
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;


