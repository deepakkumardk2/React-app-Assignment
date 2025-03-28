import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", avatar: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => setUser(response.data.data))
      .catch(error => console.error("Error fetching user:", error));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser({ ...user, avatar: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <input type="text" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
      <input type="text" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
      <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <input type="file" onChange={handleImageUpload} />
      <img src={user.avatar} alt="Preview" className="avatar" />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditUser;
