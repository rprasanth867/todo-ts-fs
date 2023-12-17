import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
    res.sendStatus(204);
});

export default router;
