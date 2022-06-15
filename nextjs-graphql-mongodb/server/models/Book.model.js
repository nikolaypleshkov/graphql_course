const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Book = mongoose.model('book', {
    name: String,
    pages: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'author'
    }
  });

module.exports = Book;