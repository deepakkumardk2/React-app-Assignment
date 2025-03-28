import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = ({ users, setUsers }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <img src={user.avatar} alt={user.first_name} className="avatar" />
          <h3>{user.first_name} {user.last_name}</h3>
          <p>{user.email}</p>
          <button onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
          <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
