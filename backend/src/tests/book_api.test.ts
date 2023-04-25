import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import { Book } from '../models/books.js';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

const api = supertest(app);

const initialBooks = [
	{
		title: 'Moby Dick',
		author: 'Herman Melville',
		rating: 5,
		review: 'Good book',
	},
	{
		title: 'Don Quixote',
		author: 'Miguel de Cervantes',
		rating: 5,
		review: 'Funny',
	},
];

describe('testing REST calls', () => {
	beforeEach(async () => {
		await Book.deleteMany({});
		let bookObject = new Book(initialBooks[0]);
		await bookObject.save();
		bookObject = new Book(initialBooks[1]);
		await bookObject.save();
	});

	describe('GET', () => {
		it('correct number of returned books', async () => {
			const res = await api.get('/api/books');

			expect(res.body).toHaveLength(initialBooks.length);
			expect(res.status).toBe(200);
		});
	});

	describe('POST', () => {
		it('return posted book', async () => {
			// const book = new Book({
			// 	title: 'Cats',
			// 	author: 'Peanut',
			// 	rating: 5,
			// 	review: 'cats are cool',
			// });
			// const res = await api.post('/api/books', book);
			// expect(res.status).toBe(201);
			// expect(res.body).toBeTypeOf('object');
		});
	});

	afterAll(async () => {
		mongoose.connection.close();
	});
});
