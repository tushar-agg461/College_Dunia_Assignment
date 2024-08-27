// models/book.js

import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true,
    },
    publishedDate: {
        type: Date,
        required: [true, 'Published Date is required'],
    },
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
