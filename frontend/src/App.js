import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Books from './components/Books';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import BookForm from './components/BookForm';
import AddBook from './components/Addbook';
import EditBook from './components/Editbook';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  

  return (
    <Router>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/register" element={<Register />} />
        <Route path='/Addbook'element={<AddBook/>}/>
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
