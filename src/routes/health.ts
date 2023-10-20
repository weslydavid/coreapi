import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.json({ nombre: 'Wesly David Escamilla' });
});

export default router;
