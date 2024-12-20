import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';


const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const bookFromState = location.state?.book;

  const [book, setBook] = useState(bookFromState || {  
    title: '',
    author: '',
    category: '',
    cover: '',
    published_date: '',
    status: 'Available',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookFromState) {
        try {
          const response = await axios.get(`http://localhost:5000/api/books/${id}`);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      }
      setLoading(false);
    };
    fetchBookDetails();
  }, [id, bookFromState]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/books/${id}`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Update Response:', response);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error updating book:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="book-image-preview">
          {book.cover && <img src={book.cover} alt="Book cover" />}
        </div>

        <div className="form-layout">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={book.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cover URL</label>
            <input
              type="text"
              name="cover"
              value={book.cover}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Publishing Date</label>
            <input
              type="text"
              name="published_date"
              value={book.published_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={book.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">
            Update Book
          </button>
          <button type="button" className="btn-back" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
