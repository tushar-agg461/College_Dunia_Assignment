import express from "express";
import Book from '../models/book.js';

const router = express.Router();

// Create a new book
router.post("/", async (req, res) => {
    try {
        const { title, author, isbn, publishedDate } = req.body;

        // Check for required fields
        if (!title || !author || !isbn || !publishedDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if ISBN already exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ message: 'ISBN already exists' });
        }

        const newBook = new Book({
            title,
            author,
            isbn,
            publishedDate,
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.log('Error creating book:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all books with pagination, search and sorting
router.get("/", async (req, res) => {
    try {
        const { title, author, limit = 10, skip = 0, sortBy = 'publishedDate', order = 'asc' } = req.query;

        // Build the filter object for search
        let filter = {};
        if (title) {
            filter.title = new RegExp(title, 'i'); // Case-insensitive search by title
        }
        if (author) {
            filter.author = new RegExp(author, 'i'); // Case-insensitive search by author
        }

        // Define the sort order
        let sortOrder = order === 'desc' ? -1 : 1;
        let sortOptions = {};
        sortOptions[sortBy] = sortOrder;

        // Retrieve books with pagination, search, and sorting
        const books = await Book.find(filter)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort(sortOptions);

        res.status(200).json(books);
    }
    catch (error) {
        console.log("Error fetching books:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


// Get a book by Id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log('Error fetching book:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid Book Id" });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// update a book by Id
router.put("/:id", async (req, res) => {
    try {
        const { title, author, isbn, publishedDate } = req.body;
        const updateFields = {};
        if (title) updateFields.title = title;
        if (author) updateFields.author = author;
        if (isbn) updateFields.isbn = isbn;
        if (publishedDate) updateFields.publishedDate = publishedDate;

        // Check if ISBN already exists
        if (isbn) {
            const existingBook = await Book.findOne({ isbn, _id: { $ne: req.params.id } });
            if (existingBook) {
                return res.status(400).json({ message: 'ISBN already exists' });
            }
        }
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    }

    catch (error) {
        console.error('Error updating book:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a book by Id
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;
