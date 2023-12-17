import express, { Router } from 'express';
import login from './loginRouter';

const router: Router = express.Router();

router.use('/login', login);

export default router;
