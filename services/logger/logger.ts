import pino from 'pino';

const logger = pino({
	timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString()}"`,
	base: undefined,
	formatters: {
		level: label => ({ label })
	}
});

export default logger;