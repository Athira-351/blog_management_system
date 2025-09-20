import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p className="p-6 text-gray-500">Loading blog...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white max-w-3xl mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>

        <div className="mt-6">
          <Link
            to="/user-dashboard"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
