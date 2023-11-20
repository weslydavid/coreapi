/* eslint-disable require-jsdoc */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import userServices from '../../services/users/users.service';
import authServices from '../../services/auth/auth.service';
import validateSchema from '../../middlewares/validateSchema';
import userSchemas from './users.schema';

async function getUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { page = 1, limit = 10 } = req.query;
    const limitNumber = Number(limit);
    const skip = (Number(page) - 1) * limitNumber;

    const users = await userServices.getUsers(skip, limitNumber);
    const count = await userServices.countUsers();
    const totalPages = Math.ceil(count / limitNumber);

    res.status(200).json({
      data: users,
      limit: Number(limit),
      page: Number(page),
      totalItems: count,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.params.id; // Se obtiene el id del usuario del parámetro de la ruta
    const user = await userServices.getUserById(userId);

    if(!user){
      res.status(400).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(500).send({
      message: 'estas entrando a este catch porque se presentó un error',
      //message: err.message,
      name: '[getUserById]'
    })
    next(error);
  }
}

async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = req.body;
    const emailLowerCase = email.toLowerCase();

    const existingUser = await userServices.getUserByEmail(emailLowerCase);

    if (existingUser) {
      return res.status(409).json({
        email,
        message: 'User already exists',
        name,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await userServices.createUser({
      email: emailLowerCase,
      name,
      password: encryptedPassword,
    });

    // Create token
    const token = authServices.createToken(user);
    // save user token
    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

const usersController = {
  getUsers: [validateSchema(userSchemas.getAllUsers), getUsersHandler],
  getUserById: [validateSchema(userSchemas.getUserById), getUserByIdHandler],
  register: [validateSchema(userSchemas.register), registerHandler],
};

export default usersController;
