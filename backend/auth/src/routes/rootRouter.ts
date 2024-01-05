import express, { Router } from 'express';
import login from './loginRouter';
import signUp from './signUpRouter';
import logout from './logoutRouter'

const router: Router = express.Router();

router.use('/login', login);
router.use('/sign-up', signUp);
router.use('/logout', logout);

export default router;
