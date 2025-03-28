import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
      <Link to="/users" className="text-white text-lg font-bold">
        User Management
      </Link>
      <div>
        <Link to="/edit-profile" className="text-white mx-4 hover:underline">
          Edit Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
