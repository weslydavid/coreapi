import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (request: Request, response: Response) => {
  response
    .status(200)
    .json({ message: 'core API is working properly.', status: 'OK' });
});

export default router;
