import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'auth-service' }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
            return `[${label}] ${timestamp} ${level}: ${message}`;
        })
      ),
    defaultMeta: { service: 'auth-service' },
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

export default logger;
