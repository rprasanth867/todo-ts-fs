import express, { Express, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
require('./configs/mysqlConfig');
import logger from './configs/logger';
import rootRouter from './routes/rootRouter';

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
    logger.info('Express app is running at 5000 port');
});

app.use('/account/v1/api', rootRouter);

// error handling
// if any error occures in the code, this middleware will execure
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error('### ERROR ###', err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({message: err.message});

    return;
});

// 404 handling
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({message: 'URL not found on the server'});
});
