import express, { Router } from 'express';
import todos from './todosRouter';

const rootRouter: Router = express.Router();

rootRouter.use('/todos', todos);

export default rootRouter;
