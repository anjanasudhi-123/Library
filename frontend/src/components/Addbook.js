import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; 

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    cover: '',
    published_date:"",
    status: 'Available',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="add-book-bg">
      <div className="form-overlay">
        <h2 className="text-center mb-4">Add to Library</h2>
        <form className="add-book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cover URL</label>
            <input
              type="text"
              name="cover"
              className="form-control"
              placeholder="Paste cover image URL"
              value={formData.cover}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Publishing Date</label>
            <input
              type="text"
              name="published_date"
              className="form-control"
              placeholder="published In"
              value={formData.published_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success btn-block mt-4">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
