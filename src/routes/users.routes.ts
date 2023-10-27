import { Router } from 'express';
const router = Router();
import usersController from '../controllers/users/users.controller';

// Obtiene una lista de usuarios.
router.get('/', usersController.getUsers);

export default router;
