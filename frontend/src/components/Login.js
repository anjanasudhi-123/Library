import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    navigate('/login');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', form.username)
      const username = localStorage.getItem('username');
      console.log(username);
      setToken(data.token);

      setErrorMessage('');
      setSuccessMessage('Login successful!');
      navigate('/books');
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      setSuccessMessage(''); 
    }
  };
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: "url('https://tse4.mm.bing.net/th?id=OIP.ZH9YYXn_uYZKPoX7y0tCxQHaEe&pid=Api&P=0&h=180')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        className="p-4 shadow"
        style={{
          width: '400px',
          background: '#F2F9FF',
          opacity: 0.95,
          borderRadius: '10px',
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: 'lightsteelblue' }}>LOG IN</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <p className="text-center mt-3">
            New member? <Link to="/register">Register</Link> 
          </p>        
          {/* <p className="text-center mt-3">
            Already logged in?{' '}
            <Button variant="link" onClick={handleLogout}>
              Logout
            </Button>
          </p> */}
          </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
