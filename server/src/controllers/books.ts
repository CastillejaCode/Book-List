import express from 'express';
const booksRouter = express.Router();
import { Book } from '../models/books.js';

booksRouter.get('/:uid', async (req, res) => {
	const { uid } = req.params;
	const books = await Book.find({ uid });
	res.status(200).json(books);
});

booksRouter.post('/', async (req, res) => {
	const book = new Book({ ...req.body });
	const savedBook = await book.save();
	res.status(201).json(savedBook);
});

booksRouter.delete('/all', async (req, res) => {
	const { uid } = req.body;
	const deletedBooks = await Book.deleteMany({ uid });
	res.status(204).json(deletedBooks);
});

booksRouter.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const deletedBook = await Book.findByIdAndDelete(id);
	res.status(204).json(deletedBook);
});

// booksRouter.delete('/all', async (req, res) => {
// 	const { uid } = req.body;
// 	const deletedBooks = await Book.deleteMany({ uid });
// 	res.status(204).json(deletedBooks);
// });
// TODO: Remove this
booksRouter.put('/:id', async (req, res) => {
	const { body } = req;
	const id = req.params.id;
	const foundBook = await Book.findByIdAndUpdate(id, body, { new: true });
	res.json(foundBook);
});

booksRouter.patch('/:id', async (req, res) => {
	const { body } = req;
	const { id } = req.params;
	const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true });
	res.status(200).json(updatedBook);
});

export default booksRouter;
