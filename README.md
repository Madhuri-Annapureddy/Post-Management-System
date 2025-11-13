Post Management System (Mini CRUD App)

A lightweight React (Vite) application that lets users create, read, update, delete, and search posts, built using Tailwind CSS and localStorage for persistence.
Designed as a mini blog admin dashboard with clean UI and responsive design.

Features
🧾 Post List: View all posts with title, author, and excerpt.

🔍 Search & Filter: Search posts by title and filter by author.

✍️ Create / Edit / Delete: Full CRUD operations with form validation and confirmation modals.

💾 LocalStorage Persistence: All posts are saved locally, no backend required.

🔗 Routing: Uses React Router for navigation between list, create, view, and edit pages.

📱 Responsive UI: Clean, mobile-friendly layout using Tailwind CSS.

🧭 Routes
Route	Description
/	Post List Page
/posts/new	Create New Post
/posts/:id	View Post Details
/posts/:id/edit	Edit Existing Post
🧠 Tech Stack

⚛️ React (Vite)

🎨 Tailwind CSS

🗂️ React Router

💾 localStorage

🧩 Project Structure
src/
├── components/
│   ├── Header.jsx
│   ├── PostCard.jsx
│   ├── PostForm.jsx
│   ├── Pagination.jsx
│
├── pages/
│   ├── PostList.jsx
│   ├── PostCreate.jsx
│   ├── PostEdit.jsx
│   ├── PostView.jsx
│
├── hooks/
│   └── useLocalStorage.js
│
├── utils/
│   └── validators.js
│
├── App.jsx
└── main.jsx

🧾 Data Example
{
  "id": "uuid",
  "title": "Post Title",
  "author": "Madhuri",
  "content": "This is the content of the post.",
  "tags": ["react", "crud"],
  "createdAt": "2025-07-01T10:00:00Z",
  "updatedAt": "2025-07-01T10:00:00Z"
}

⚙️ How to Run Locally

Clone the repository

git clone https://github.com/your-username/post-management-system.git


Navigate to project folder

cd post-management-system


Install dependencies

npm install


Run the development server

npm run dev


Open in browser
Visit the local URL (shown in terminal, e.g., http://localhost:5173)
