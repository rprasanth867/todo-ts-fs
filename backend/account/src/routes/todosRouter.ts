import express, { Request, Response, Express, Router } from 'express';
import { MESSAGES } from '../models/constants';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from '../controllers/todoController';

const router: Router = express.Router();

router.get('/all', getAllTodos);

router.post('/add', createTodo);

router.put('/:todoId', updateTodo);

router.delete('/:todoId', deleteTodo);

router.all('*', (req: Request, res: Response) => {
    res.status(404).json({message: MESSAGES.urlNotFound});
})

export default router;
