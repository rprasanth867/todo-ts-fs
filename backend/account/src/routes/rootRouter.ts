import express, { Router } from 'express';
import userRouter from './users';

const rootRouter: Router = express.Router();

rootRouter.use('/users', userRouter);

export default rootRouter;
