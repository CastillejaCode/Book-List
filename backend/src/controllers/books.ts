import express from 'express';
const booksRouter = express.Router();

booksRouter.get('/', (req, res) => {
	res.send('testing');
});

export default booksRouter;
