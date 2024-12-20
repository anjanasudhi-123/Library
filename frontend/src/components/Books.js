import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/api';
import '../styles.css';
import Navbar from './Navbar';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const getBooks = async () => {
      const { data } = await fetchBooks();
      setBooks(data);
      setFilteredBooks(data);
    };
    getBooks();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) => book.category === category);
      setFilteredBooks(filtered);
    }
  };

  const handleGlobalSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setGlobalSearchTerm(term);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term) ||
      book.status.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  const groupByCategory = (books) => {
    return books.reduce((acc, book) => {
      const { category } = book;
      if (!acc[category]) acc[category] = [];
      acc[category].push(book);
      return acc;
    }, {});
  };

  const groupedBooks = groupByCategory(filteredBooks);

  const categories = ['Romance', 'Adventure', 'Fantacy', 'Horror', 'All'];

  return (
    <div>
      <Navbar />
      <div className="books-container">
        <input
          type="text"
          placeholder="Search..."
          value={globalSearchTerm}
          onChange={handleGlobalSearch}
          style={{
            padding: '10px',
            marginTop: '50px',
            width: '100%',
            maxWidth: '500px',
            border: '1px solid lightgray',
            borderRadius: '5px',
            display: 'block',
            margin: '0 auto',
          }}
        />

        <div className="top-sections">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-box"
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: '15px',
                margin: '10px',
                border: '1px solid lightgray',
                borderRadius: '5px',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: selectedCategory === category ? 'lightgrey' : '#fff',
                boxShadow: selectedCategory === category ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '',
              }}
            >
              {category}
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 ? (
          <h4 style={{ textAlign: 'center', color: 'red' }}>Not found</h4>
        ) : (
          Object.keys(groupedBooks).map((category) => (
            <div key={category} className="category-section">
              <h3 className="category-heading">{category}</h3>
              <div className="books-row">
                {groupedBooks[category].map((book) => (
                  <div key={book._id} className="book-card">
                    <img
                      src={book.cover}
                      alt={`${book.title} cover`}
                      className="book-image"
                    />
                    <div className="book-details">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-author">by {book.author}</p>
                      <p
                        className="book-status"
                        style={{
                          color: book.status === 'Available' ? 'green' : 'red',
                        }}
                      >
                        {book.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Your Library. All Rights Reserved.</p>
          <p>
            <a href="/privacy-policy">Privacy Policy</a> |{' '}
            <a href="/terms-of-service">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Books;
