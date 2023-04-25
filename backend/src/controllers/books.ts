import express from 'express';
const booksRouter = express.Router();

import { Book } from '../models/books.js';

booksRouter.get('/', async (_req, res) => {
	const books = await Book.find({});
	res.status(200).json(books);
});

booksRouter.post('/', async (req, res) => {
	const book = new Book({ ...req.body });
	const savedBook = await book.save();
	res.status(201).json(savedBook);
});

export default booksRouter;
