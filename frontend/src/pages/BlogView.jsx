import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const markBlogViewed = async () => {
    try {
      await API.post(`/blogs/${id}/mark-viewed`);
    } catch (err) {
      console.error("Failed to mark blog as viewed:", err);
    }
  };

    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
        markBlogViewed(); 
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{blog.title}</h2>
      <p className="mt-4">{blog.content}</p>
      <button
        onClick={() => navigate("/user-dashboard")}
        className="mt-4 bg-gray-500 text-white px-4 py-2"
      >
        Back
      </button>
    </div>
  );
};

export default BlogView;
