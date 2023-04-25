import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const MONGODB =
	process.env.NODE_ENV === 'test'
		? process.env.TEST_MONGODB
		: process.env.MONGODB;

export default { PORT, MONGODB };
