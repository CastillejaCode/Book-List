import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import booksRouter from './controllers/books.js';
import config from './utils/config.js';
import logger from './utils/logger.js';
const app = express();

const corsOptions = {
	origin: 'https://tometracker.pages.dev',
	optionsSuccessStatus: 200,
};

mongoose.set('strictQuery', false);

if (config.MONGODB) {
	mongoose
		.connect(config.MONGODB)
		.then(() => logger.info('connected to MONGODB'))
		.catch((error) =>
			logger.error('errror connecting to mongoDB', error.message)
		);
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/books', booksRouter);
app.get('/', (_req, res) => {
	res.send('howdy');
});

export default app;
