import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const [name, setName] = useState(localStorage.getItem("name") || "User");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs/unseen");
        setBlogs(res.data);
      } catch (err) {
        if (err.response?.status === 403) {
          alert("Access denied: User privileges required.");
        } else {
          console.error(err);
        }
      }
    };

    const fetchUnseenCount = async () => {
      try {
        const res = await API.get("/blogs/unseen-count");
        setUnseenCount(res.data.unseenCount);
      } catch (err) {
        console.error("Error fetching unseen count:", err);
      }
    };

    const fetchUserName = async () => {
      const name = localStorage.getItem("name") || "User";
      setName(name);
    };

    fetchBlogs();
    fetchUnseenCount();
    fetchUserName();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here are your latest unread blogs.
        </p>
        <p className="text-gray-600 mt-1">
          You have{" "}
          <span className="text-blue-600">{unseenCount}</span> unseen blogs.
        </p>
      </header>

      {/* Blogs Section */}
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          You’re all caught up! No new blogs available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {blog.content?.substring(0, 120)}...
              </p>
              <button
                onClick={() => navigate(`/user/blogs/${blog.id}`)}
                className="text-blue-600 font-medium hover:underline"
              >
                Read More →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
