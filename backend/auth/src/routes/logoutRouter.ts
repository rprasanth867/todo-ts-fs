import express, { Router } from 'express';
import { logoutUser } from '../controllers/logoutController';

const router: Router = express.Router();

router.post('/', logoutUser);

export default router;
