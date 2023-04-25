import express from 'express';
const app = express();
import cors from 'cors';
import booksRouter from './controllers/books.js';

app.use(cors());

app.use('/api/books', booksRouter);

export default app;
