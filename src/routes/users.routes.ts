import { Router } from 'express';
const router = Router();
import usersController from '../controllers/users/users.controller';

// Get all users.
router.get('/', usersController.getUsers);

export default router;
