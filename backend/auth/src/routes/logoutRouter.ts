import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/', logoutController);

export default router;
