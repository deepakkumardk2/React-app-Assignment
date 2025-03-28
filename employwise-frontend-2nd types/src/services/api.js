import axios from "axios";

const API_URL = "https://reqres.in/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users?page=1`);
  return response.data.data;
};

export const updateUser = async (id, user) => {
  await axios.put(`${API_URL}/users/${id}`, user);
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};
