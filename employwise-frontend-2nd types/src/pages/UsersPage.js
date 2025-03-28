import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=1")
      .then(response => setUsers(response.data.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Users List</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
};

export default UsersPage;
