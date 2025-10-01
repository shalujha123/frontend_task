import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">MERN Project</Link>
      </h1>
      <nav className="space-x-4">
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
