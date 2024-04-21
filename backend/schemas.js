const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Publisher: String,
    ISBN: String,
    Status: String,
    CheckedOutBy: String,
    DueDate: String
},
{
    collection: 'booklist'
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;