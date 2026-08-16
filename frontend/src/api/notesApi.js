import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const normalizeError = (error) => {
  const message = error.response?.data?.message || 'Something went wrong';
  throw new Error(message);
};

const getNotes = async (token) => {
  try {
    const response = await axios.get(API_URL, authHeader(token));
    return response.data;
  } catch (error) {
    normalizeError(error);
  }
};

const createNote = async (token, title, content) => {
  try {
    const response = await axios.post(API_URL, { title, content }, authHeader(token));
    return response.data;
  } catch (error) {
    normalizeError(error);
  }
};

const updateNote = async (token, id, title, content) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { title, content }, authHeader(token));
    return response.data;
  } catch (error) {
    normalizeError(error);
  }
};

const deleteNote = async (token, id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, authHeader(token));
    return response.data;
  } catch (error) {
    normalizeError(error);
  }
};

export default { getNotes, createNote, updateNote, deleteNote };