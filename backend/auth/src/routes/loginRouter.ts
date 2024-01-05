import express, { Router } from 'express';
import { authenticateUserLogin } from '../controllers/loginController';

const router: Router = express.Router();

router.post('/', authenticateUserLogin);

export default router;
