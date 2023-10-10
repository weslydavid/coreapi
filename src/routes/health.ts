import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.json({ nombre: '´Wesly David' });
});

export default router;
