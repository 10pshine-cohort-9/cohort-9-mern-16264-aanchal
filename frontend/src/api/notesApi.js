import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const getNotes = async (token) => {
  const response = await axios.get(API_URL, authHeader(token));
  return response.data;
};

const createNote = async (token, title, content) => {
  const response = await axios.post(API_URL, { title, content }, authHeader(token));
  return response.data;
};

const updateNote = async (token, id, title, content) => {
  const response = await axios.put(`${API_URL}/${id}`, { title, content }, authHeader(token));
  return response.data;
};

const deleteNote = async (token, id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeader(token));
  return response.data;
};

export default { getNotes, createNote, updateNote, deleteNote };