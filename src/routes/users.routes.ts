import { Router } from 'express';
const router = Router();
import usersController from '../controllers/users/users.controller';
import validateSchema from '../middlewares/validateSchema';
import userSchemas from '../controllers/users/users.schema';

// Get all users.
router.get(
  '/',
  validateSchema(userSchemas.getAllUsers),
  usersController.getUsersHandler,
);

// Register a new user.
router.post(
  '/register',
  validateSchema(userSchemas.register),
  usersController.registerHandler,
);

// Get user by id.
router.get(
  '/:id',
  validateSchema(userSchemas.getUserById),
  usersController.getUserByIdHandler,
);

export default router;
