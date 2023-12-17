import express, { Router } from 'express';
import todos from './todosRouter';

const userRouter: Router = express.Router();

userRouter.use('/todos', todos);

export default userRouter;
