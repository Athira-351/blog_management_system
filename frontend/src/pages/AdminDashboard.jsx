import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        if (err.response?.status === 403)
          alert("Access denied. Admin privileges required.");
        else console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      if (err.response?.status === 403)
        alert("Access forbidden: Admin privileges required.");
      else console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin-dashboard"
            className="block px-4 py-2 rounded hover:bg-blue-100 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/blogs/new"
            className="block px-4 py-2 rounded hover:bg-blue-100 font-medium"
          >
            Create Blog
          </Link>
          <Link
            to="/admin-dashboard"
            className="block px-4 py-2 rounded hover:bg-blue-100 font-medium"
          >
            Manage Users
          </Link>
          <Link
            to="/admin-dashboard"
            className="block px-4 py-2 rounded hover:bg-blue-100 font-medium"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <Link
            to="/admin/blogs/new"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + New Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No blogs available.
            </p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {blog.content?.substring(0, 100)}...
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Link
                    to={`/admin/blogs/edit/${blog.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500 hover:underline font-medium"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;