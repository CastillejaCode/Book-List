import app from './app.js';
import logger from './utils/logger.js';
import config from './utils/config.js';

const PORT = Number(config.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
	logger.info(`Connected to port ${config.PORT}`);
});
