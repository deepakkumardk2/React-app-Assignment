import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    await axios.put(`https://reqres.in/api/users/${id}`, user);
    navigate("/users");
  };

  return (
    <div className="p-4">
      <h2>Edit User</h2>
      <input className="border p-2 mb-2" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
      <input className="border p-2 mb-2" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
      <input className="border p-2 mb-2" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <button onClick={handleUpdate} className="bg-blue-500 text-white p-2">
        Update
      </button>
    </div>
  );
};

export default EditUser;
