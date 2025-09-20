import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const BlogEditor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Fetch existing blog if editing
  useEffect(() => {
    if (isEditing) {
      API.get(`/blogs/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          alert("Error fetching blog.");
        });
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      if (isEditing) {
        // Update existing blog
        await API.put(`/blogs/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog updated successfully!");
      } else {
        // Create new blog
        await API.post("/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog created successfully!");
      }

      navigate("/admin-dashboard");
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Access denied: Admin privileges required.");
      } else {
        console.error("Error saving blog:", err);
        alert("Error saving blog.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit Blog" : "Create New Blog"}
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Content
              </label>
              <textarea
                placeholder="Write your blog content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg h-64 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="border border-gray-300 p-2 rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/admin-dashboard")}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
