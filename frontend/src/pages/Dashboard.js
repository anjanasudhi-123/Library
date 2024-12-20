import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';
import Navbar from '../components/Navbar';
const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error.response?.data || error.message);
      return [];
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        console.error('No token found, please login');
        return;
      }
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book._id !== id));
      alert('Removed successful');

    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Literary Collection</h2>
        <div className="book-actions">
          <Link to="/Addbook" className="btn btn-primary">Add New Book</Link>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="book-table-container">
          <table className="book-tables">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Cover</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td><img src={book.cover} alt={`${book.title} cover`} className="book-images" /></td>
                  <td style={{ color: book.status === 'Available' ? 'green' : 'red' }}>
                    {book.status}
                  </td>

                  <td>
                    <Link to={`/edit-book/${book._id}`} state={{ book }} className="btn btn-warning">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(book._id)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
