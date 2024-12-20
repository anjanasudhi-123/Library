import React, { useState } from 'react';
import { addBook, updateBook } from '../api/api'; 
import { useNavigate, useParams } from 'react-router-dom';


const BookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    cover: '',
    status: '',
    published_date: '', 
  });

  const { id } = useParams(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log("Submitting Book Data:", book); 
    try {
      if (id) {
        await updateBook(id, book, token); 
      } else {
        await addBook(book, token); 
      }
      navigate('/'); 
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  return (
    <div className="book-form">
      <h1>{id ? 'Edit Book' : 'Add New Book'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={book.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cover</label>
          <input
            type="text"
            name="cover"
            value={book.cover}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={book.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <label>Published Date</label>
          <input
            type="date"
            name="published_date"
            value={book.published_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default BookForm;
