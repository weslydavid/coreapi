import { Router } from 'express';
const router = Router();
import usersController from '../controllers/users/users.controller';

// Get all users.
router.get('/', usersController.getUsers);

// Register a new user.
router.post('/register', usersController.register);

export default router;
