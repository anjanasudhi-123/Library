import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', 
});
export const loginUser = (data) => API.post('/api/auth/login', data);

export const registerUser = (data) => API.post('/api/auth/register', data);

export const fetchBooks = () => API.get('/api/books');

export const addBook = (data, token) =>
  API.post('/api/books', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateBook = (id, data, token) =>
  API.put(`/api/books/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteBook = (id, token) =>
  API.delete(`/api/books/${id}`, { headers: { Authorization: `Bearer ${token}` } });
