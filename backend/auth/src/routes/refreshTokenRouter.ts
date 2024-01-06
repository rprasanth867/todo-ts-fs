import express, { Router } from 'express';
import { generateNewToken } from '../controllers/refreshTokenController';
import { validateRefreshToken } from '../middlewares/validateTokens';

const router: Router = express.Router();

router.post('/', validateRefreshToken, generateNewToken);

export default router;
