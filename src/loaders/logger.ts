import pino from 'pino';
import expressPino from 'express-pino-logger';
import config from './../config/config';

const logger = pino({
  level: config.logs.level || 'info',
  prettyPrint: { levelFirst: true, colorize: true, ignore: 'pid' },
});
const expressLogger = expressPino({ logger });

export { logger, expressLogger };
