const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Connect to the database
connectDB();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend's URL
    methods: ['GET', 'POST','PUT','DELETE'],
  }));


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use routes for authentication and books
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Set the port for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
