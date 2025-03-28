import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    };
    fetchUsers();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto mt-5">
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mb-4">
        Logout
      </button>
      <input
        type="text"
        placeholder="Search users..."
        className="border p-2"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {users
          .filter((user) =>
            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <div key={user.id} className="p-4 border rounded">
              <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full" />
              <h3>{user.first_name} {user.last_name}</h3>
              <button onClick={() => navigate(`/edit/${user.id}`)} className="bg-green-500 text-white p-1">
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white p-1 ml-2">
                Delete
              </button>
            </div>
          ))}
      </div>
      <div className="mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="mr-2">
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
