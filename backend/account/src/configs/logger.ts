import { Logger, createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, label } = format;

const logger: Logger = createLogger({
    level: 'info',
    format: combine(
      label({label: 'account-service'}),
      timestamp(),
      printf(({label, level, message, timestamp }) => {
        return `[${label}] ${timestamp} ${level}: ${message}`;
      })
    ),
    defaultMeta: { service: 'account-service' },
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
});

export default logger;
