import config from './utils/config.js';
import express from 'express';
const app = express();
import cors from 'cors';
import booksRouter from './controllers/books.js';
import mongoose from 'mongoose';
import logger from './utils/logger.js';

mongoose.set('strictQuery', false);

if (config.MONGODB) {
	mongoose
		.connect(config.MONGODB)
		.then(() => logger.info('connected to MONGODB'))
		.catch((error) =>
			logger.error('errror connecting to mongoDB', error.message)
		);
}

app.use(cors());
app.use(express.json());

app.use('/api/books', booksRouter);

export default app;
