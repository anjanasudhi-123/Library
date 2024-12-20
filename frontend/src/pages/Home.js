import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api/api'; 

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="home">
      <h1>Welcome to the Library</h1>
      <h2>Available Books</h2>
      <div className="book-list">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.category}</p>
                <p>{book.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
