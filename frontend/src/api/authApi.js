import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const signup = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, {
    name,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

const logout = async (token) => {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    authHeader(token)
  );
  return response.data;
};

export default { signup, login, logout };