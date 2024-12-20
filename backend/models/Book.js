const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    cover: { type: String },
    published_date: { type: String }, 
    status: { type: String, default: 'Available' },
});

module.exports = mongoose.model('Book', bookSchema);
