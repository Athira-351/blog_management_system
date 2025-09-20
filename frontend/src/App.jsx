import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import BlogEditor from "./pages/BlogEditor.jsx";
import BlogView from "./pages/BlogView.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/new"
            element={
              <ProtectedRoute role="admin">
                <BlogEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/edit/:id"
            element={
              <ProtectedRoute role="admin">
                <BlogEditor />
              </ProtectedRoute>
            }
          />

          {/* User */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/blogs/:id"
            element={
              <ProtectedRoute role="user">
                <BlogView />
              </ProtectedRoute>
            }
          />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
