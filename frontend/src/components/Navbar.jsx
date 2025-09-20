import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto ml-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-200"
        >
          Blog Management <span className="text-yellow-300">System</span>
        </Link>

        <div className="flex items-center space-x-6 -mr-45">
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition-colors duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-lg hover:bg-yellow-300 transition-colors duration-200 font-semibold"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-transparent border-white border-2 px-4 py-1.5 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
