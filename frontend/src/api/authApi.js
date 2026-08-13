import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const normalizeError = (error) => {
  const message = error.response?.data?.message || 'Something went wrong';
  throw new Error(message);
};

const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    normalizeError(error);
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    normalizeError(error);
  }
};

const logout = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, authHeader(token));
    return response.data;
  } catch (error) {
    normalizeError(error);
  }
};

export default { signup, login, logout };