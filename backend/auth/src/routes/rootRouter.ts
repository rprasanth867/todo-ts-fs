import express, { Router } from 'express';
import login from './loginRouter';
import signUp from './signUpRouter';

const router: Router = express.Router();

router.use('/login', login);
router.use('/sign-up', signUp);

export default router;
